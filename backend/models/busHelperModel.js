const mongoose = require('mongoose');
const busHelperSchema = new mongoose.Schema({
country: [
        {
            state: String, 
            buses: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Bus'  
                }
            ]
        }    
    ]
});

module.exports = mongoose.model('BusHelper', busHelperSchema);
