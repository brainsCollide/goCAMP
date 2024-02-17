const express = require('express');
const router = express.Router({ mergeParams: true });
const {validateReview, isLoggedIn, isReviewAuthor }= require('../middleware.js')
const Campground = require('../models/campground');
const Review = require('../models/review') 

const ExpressError = require('../utils/ExpressError');
const catchAsync = require('../utils/catchAsync');
const reviews = require('../controllers/reviews')
const { reviewSchema } = require('../schemas.js');
const { submitReview } = require('../controllers/reviews.js');
const review = require('../models/review');


router.post('/',isLoggedIn, validateReview, catchAsync(reviews.submitReview))

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview))

module.exports = router;
