import fs from "fs";

const DOWNLOAD_FOLDER = "./download";

const removeDownloadFolder = () => {
  if (fs.existsSync(DOWNLOAD_FOLDER))
    fs.rmSync(DOWNLOAD_FOLDER, { recursive: true, force: true });
};

removeDownloadFolder();
