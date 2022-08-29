import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles, isvalideUrl} from './util/util';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  /**************************************************************************** */

  //! END @TODO1

  app.get("/filteredimage", async (req: Request, res: Response) => {
    // validate the image_url query
    const image_url = req.query["image_url"];
    if(isvalideUrl(image_url)){
      // call filterImageFromURL to filter the image
      filterImageFromURL(image_url).then(filteredpath => {
        // send the resulting file in the response
        res.status(200).sendFile(filteredpath, function(err){
          if(err) console.log(err)
          // deletes any files on the server on finish
          else deleteLocalFiles([filteredpath])
        })
        })
      .catch( _error => res.status(422).send("error"))
    
    }else{
      res.status(422).send("image url should be valid");
    }
    
  });
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( _req: Request, res: Response) => {
    res.status(200).send("try GET /filteredimage?image_url={{}}")
  } );

  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();