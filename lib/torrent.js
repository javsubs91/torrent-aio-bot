const WebTorrent = require("webtorrent");
const fs = require("fs");
const path = require("path");
const prettyBytes = require("../utils/prettyBytes");
const humanTime = require("../utils/humanTime");
const mkfile = require("../utils/mkfile");
@@ -76,7 +77,8 @@ class Torrent {
      let filePath;
      if (torrent.files.length === 1) filePath = `./downloads/${torrent.infoHash}/${file.path}/${file.path}`;
      else filePath = `./downloads/${torrent.infoHash}/${file.path}`;
      mkfile(filePath);
      //mkfile(filePath);
      fs.mkdirSync(path.dirname(filePath), {recursive: true});
      let toFile = fs.createWriteStream(filePath);
      let torrentFile = file.createReadStream();
      torrentFile.pipe(toFile);
    });
    try {
      ziper(`./downloads/${torrent.infoHash}/${torrent.name}`);
      const torr = this.statusLoader(torrent);
      if (onDriveUploadStart) onDriveUploadStart(torr);
      const url = await uploadWithLog(`./downloads/${torrent.infoHash}/${torrent.name}`);
      if (onDriveUpload) onDriveUpload(torr, url);
    } catch (e) {
      console.log(e);
    }
  };
}
module.exports = Torrent;
