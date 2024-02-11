const { BadRequestError } = require('../Errors');
const Feed=require('../Models/feed');
const {StatusCodes}=require('http-status-codes');


const createFeed=async(req,res,next)=>{



    const feed=await Feed.create({
        sender:{
            name:req.user.username,
            id:req.user.userId,
        },
        description:req.body.description,
        image:req.body.image,
        time:req.body.time,
        location:req.body.location,

    });

    res.status(StatusCodes.CREATED).json(feed);

}

const getFeedAreaWise=async(req,res,next)=>{

    const feed=await Feed.find({location:req.location});
    res.status(200).json(feed);
}


const addComment = async (req, res, next) => {

    const feedId = req.body.id; // Assuming the id is in req.body.id
    const commentText = req.body.comment; // Assuming req.body.comment contains the comment text

    // Update the feed document by pushing the comment object to the comments array
    const updatedFeed = await Feed.findOneAndUpdate(
      { _id: feedId },
      {
        $push: {
          Comments: {
            sender: { name: req.user.username, id: req.user.userId },
            comment: commentText
          }
        }
      },
      { new: true } // Return the modified document
    );

    if (!updatedFeed) {
      // Handle the case where the feed with the given id is not found
      return next(new BadRequestError('Something went wrong! Please try again.'));
    }

    // Optionally, you can send the updated feed in the response
    res.json(updatedFeed);

};


const addLike = async (req, res, next) => {
  
    const feedId = req.body.id; // Assuming the id is in req.body.id

    // Update the feed document by incrementing the value of the existence field
    const updatedFeed = await Feed.findOneAndUpdate(
      { _id: feedId },
      { $inc: { likes: 1 } },
      { new: true } // Return the modified document
    );

    if (!updatedFeed) {
      // Handle the case where the feed with the given id is not found
      return res.status(404).json({ error: 'Feed not found' });
    }

    // Optionally, you can send the updated feed in the response
    res.json(updatedFeed);
};

module.exports={createFeed,addComment,getFeedAreaWise,addLike};
