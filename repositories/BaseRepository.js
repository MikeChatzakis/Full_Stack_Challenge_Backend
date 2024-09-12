class BaseRepository {
    constructor(model) {
        this.model = model;
    }

    async find(query = {}, lean = false) {
        return lean ?  this.model.find(query).lean() : this.model.find(query);
    }

    async findById(id) {
        return this.model.findById(id);
    }

    async create(data) {
        return this.model.create(data);
    }

    async update(id, data) {
        return this.model.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id) {
        return this.model.findByIdAndDelete(id);
    }
}

module.exports = BaseRepository;