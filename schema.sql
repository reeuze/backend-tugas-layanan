CREATE TABLE IF NOT EXISTS Image (
    imageId INT AUTO_INCREMENT PRIMARY KEY,
    Nama VARCHAR(255),
    Deskripsi TEXT,
    Link_Gambar VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS Tag (
    tagId INT AUTO_INCREMENT PRIMARY KEY,
    ID_Gambar INT,
    Nama_Tags VARCHAR(255),
    FOREIGN KEY (ID_Gambar) REFERENCES Gambar(ID_Gambar)
);

CREATE TABLE IF NOT EXISTS User (
    userId INT AUTO_INCREMENT PRIMARY KEY,
    Nama_User VARCHAR(255),
    Email_User VARCHAR(255),
    ID_Gambar INT,
    FOREIGN KEY (ID_Gambar) REFERENCES Gambar(ID_Gambar)
);

CREATE TABLE IF NOT EXISTS ImageTag (
    imageid INT,    
    tagid INT,
    PRIMARY KEY (imageid, tagid),
    FOREIGN KEY (imageid) REFERENCES image(imageId),
    FOREIGN KEY (tagid) REFERENCES Tag(tagId)
);