class ScrappingController {
    private readonly tasks = new Map<string, boolean>();
    constructor() {}

    checkIsBusy(id: string) {
        return this.tasks.has(id);
    }

    setBusy(id: string) {
        this.tasks.set(id, true);
    }

    release(id: string) {
        this.tasks.delete(id);
    }
}

export default new ScrappingController();
