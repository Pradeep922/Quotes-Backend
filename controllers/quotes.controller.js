const Quotes = require('../models/quotes.model');

exports.getQuotes = async (req, res)=> {
    try{
        // Quotes.find((err, data) => {
        //     if(err){
        //         return res.status(400).send({message: 'Error while retrieving the quotes.'})
        //     }

        //     res.status(200).send({quotes: data});
        // })

        const response = await Quotes.find();

        if(response){
            return res.status(200).send({quotes: response});
        }

        res.status(400).send({message: 'Error while retrieving the quotes.'})

    }catch(error){
        res.status(500).send({message: 'Internal Server Error'});
    }
}
exports.getQuotesById = (req, res)=> {
    try{
        Quotes.findOne({_id: req.params.quoteId}, (err, data) => {
            if(err){
                return res.status(400).send({message: 'Error while retrieving a quote.'})
            }

            res.status(200).send({quote: data});
        })
    }catch(error){
        res.status(500).send({message: 'Internal Server Error'});
    }
}

exports.addQuote = (req, res) => {
    try{
        const newQuote = Quotes(req.body);

        newQuote.save((err, data) => {
            if(err){
                return res.status(400).send({message: 'Error while adding a quote.'})
            }

            res.status(201).send({quoteId: data._id, message: 'Quote has been added successfully.'})
        })

        
    }catch(error){
        res.status(500).send({message: 'Internal Server Error'});
    }
}

exports.updateQuote = (req, res ) => {
    try{
        Quotes.findByIdAndUpdate({_id: req.params.quoteId}, {$set: req.body}, (err, data) => {
            if(err){
                return res.status(400).send({message: 'Error while updating the quote.'})
            }

            res.status(201).send({quoteId: data._id, message: 'Quote has been updated successfully.'})
        })
    }catch(error){
        res.status(500).send({message: 'Internal Server Error'});
    }
}

exports.deleteQuote = (req, res)=> {
    try{
        console.log("H",req.params.quoteId)
        Quotes.deleteOne({_id: req.params.quoteId}, (err, data) => {
            console.log(data.deletedCount)
            if(err){
                return res.status(400).send({message: 'Error while deleting the quote.'})
            }
            if(data.deletedCount === 1){
                res.status(200).send({message: 'Quote has been successfully deleted.'})
            } else {
                res.status(400).send({message: 'Quote not found'})
            }
            
        })
    }catch(error){
        res.status(500).send({message: 'Internal Server Error'});
    }
}