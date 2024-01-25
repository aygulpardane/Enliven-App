const {RESTDataSource} = require('@apollo/datasource-rest');

class PlantAPI extends RESTDataSource {
    baseURL = 'https://perenual.com/docs/api';

    getAllPlants() {
        return this.get(`species-list?key=sk-QFPQ65a46a82e7f9d3783`);
    };

    getSinglePlant(plantId) {
        return this.get(`species/details/${plantId}?key=sk-QFPQ65a46a82e7f9d3783`);
    };
}

module.exports = PlantAPI;
