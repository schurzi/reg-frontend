import { Entries } from 'type-fest'

declare global {
	interface ObjectConstructor {
		entries<T extends object>(t: T): Entries<T>
	}
}
