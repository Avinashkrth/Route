const BusService = require('../services/busService');
class BusController {
    async createBus(req, res) {
        try {
            const newBus = await BusService.createBus(req.body);
            return res.status(201).json(newBus);
        } catch (error) {
             console.log(error);
            return res.status(400).json({ error: error.message });
        }
    }

    async getAllBuses(req, res) {
        try {
            const buses = await BusService.getAllBuses();
            return res.status(200).json(buses);
        } catch (error) {
           return res.status(500).json({ error: error.message });
        }
    }

    async getBusById(req, res) {
        try {
            const bus = await BusService.getBusById(req.params.id);
            if (!bus) return res.status(404).json({ message: 'Bus not found' });
            res.status(200).json(bus);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateBus(req, res) {
        try {
            const updatedBus = await BusService.updateBus(req.params.id, req.body);
            if (!updatedBus) return res.status(404).json({ message: 'Bus not found' });
            res.status(200).json(updatedBus);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async deleteBus(req, res) {
        try {
            const deletedBus = await BusService.deleteBus(req.params.id);
            if (!deletedBus) return res.status(404).json({ message: 'Bus not found' });
            res.status(200).json({ message: 'Bus deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async getAllBusesState(req,res)
    {
        try{
            const busesData=await BusService.getAllBusesState(req.params.state);
            res.status(200).json(busesData);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async getAllBusesCountry(req,res)
    {
        try{
            const busesData=await BusService.getAllBusesCountry();
            res.status(200).json(busesData);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new BusController();
