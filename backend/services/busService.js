const Bus = require('../models/busModel');
const BusHelperModel = require('../models/busHelperModel');
class BusService {
    async createBus(busData) {
        const bus = new Bus(busData);
        const state = bus.state; 
        let busHelper = await BusHelperModel.findOne({ 'country.state': state });
        if (!busHelper) {
            busHelper = await BusHelperModel.findOneAndUpdate(
                {},
                { 
                    $push: { country: { state: state, buses: [bus._id] } } 
                },
                { upsert: true, new: true }
            );
        } else {
            await BusHelperModel.findOneAndUpdate(
                { 'country.state': state },
                { $push: { 'country.$.buses': bus._id } }
            );
        }
        const savedBus = await bus.save();
        return savedBus;
    }

    async getAllBuses() {
        return await Bus.find();
    }
    async getBusById(busId) {
        return await Bus.findOne({ busId: busId });
    }
    async updateBus(busId, updateData) {
        return await Bus.findOneAndUpdate({ busId: busId }, updateData, { new: true });
    }
    async deleteBus(busId) {
        const bus = await Bus.findOneAndDelete({ busId: busId });
    
    if (bus) {
        await BusHelperModel.updateMany(
            { 'country.state': bus.state },
            { $pull: { 'country.$.buses': bus._id } }
        );
        return bus;  
    }
    }
    async getAllBusesState(state)
    {
        return await BusHelperModel.find(
            { 'country.state': state },
            { 'country.buses': 1 } 
        ).populate('country.buses');
    }
    async getAllBusesCountry()
    {
        return await BusHelperModel.find(
            {},
            { 'country.buses': 1 } 
        ).populate('country.buses');
    }
}
module.exports = new BusService();
