const { StatusCodes } = require('http-status-codes');
const Beat = require('../models/Beat.model');
const createError = require('http-errors');
const fs = require("fs");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;


module.exports.create = async (req, res, next) => {
   console.log('entra en create');

   const storage = multer.diskStorage({
      filename: (req, file, cb) => {
        const fileExt = file.originalname.split(".").pop();
        const filename = `${new Date().getTime()}.${fileExt}`;
        cb(null, filename);
      },
   });

   const fileFilter = (req, file, cb) => {
      if (file.mimetype === "audio/mp3" || file.mimetype === "audio/mpeg" || file.mimetype === "audio/wav") {
        cb(null, true);
      } else {
        cb(
          {
            message: "Unsupported File Format",
          },
          false
        );
      }
    };

    const upload = multer({
      storage,
      limits: {
        fieldNameSize: 200,
        fileSize: 5 * 1024 * 1024,
      },
      fileFilter,
    }).single("audio");

    upload(req, res, (err) => {
      if (err) {
        return res.send(err);
      }

      upload(req, res, (err) => {
         if (err) {
           return res.send(err);
         }
     
         // SEND FILE TO CLOUDINARY
         cloudinary.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_KEY,
            api_secret: process.env.CLOUDINARY_SECRET,
         });
         const { path } = req.file; // file becomes available in req at this point

         console.log('chega em req.file', path)
     
         const fName = req.file.originalname.split(".")[0];
         cloudinary.uploader.upload(
           path,
           {
             resource_type: "raw",
             public_id: `AudioUploads/${fName}`,
           },
     
           // Send cloudinary response or catch error
           (err, audio) => {
             if (err) return res.send(err);
     
             fs.unlinkSync(path);
             console.log('audio criado', audio)
             res.send(audio);
           }
         );
       });
     });
     
      
   //  const { name, price, bpm, key, gender } = req.body.beatInfo;
   //  Beat.create({name, price, image, bpm, key, gender})
   //   .then(beatCreate => {
   //      res.status(StatusCodes.CREATED).json(beatCreate)
   //       console.log('ENTRAAAAA')
   //    })
   //   .catch(next)
}


