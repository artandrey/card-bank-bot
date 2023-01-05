class ScrappingController {
    private readonly tasks = new Map<string, boolean>();
    constructor() {}

    checkIsBusy(id: string) {
        this.tasks.set(id, true);
    }
}
