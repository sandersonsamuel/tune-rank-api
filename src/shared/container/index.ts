export class Container {

    private static dependencies: Map<string, any> = new Map()

    static register<T>(key: string, factory: () => T) {
        if (!this.dependencies.has(key)){
            this.dependencies.set(key, factory())
        }
    }

    static resolve<T>(key: string): T {
        const dependency = this.dependencies.get(key)

        if (!dependency) {
            throw new Error(`Dependency ${key} not found`)
        }

        return dependency
    }
}