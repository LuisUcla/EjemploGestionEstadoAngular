import { Injectable } from '@angular/core'
import { ComponentStore } from '@ngrx/component-store'
import { EMPTY, Observable } from 'rxjs'
import { catchError, concatMap, finalize, tap } from 'rxjs/operators'
import { Car } from '../models/car'
import { ParkingLotService } from '../services/parking-lot.service'

// The state model
interface ParkingState {
    cars: Car[] // render the table with cars
    error: string // show the error when try to add cars
    loading: boolean // used to enable/disable elements in the UI while fetching data
}

@Injectable()
export class StoreService extends ComponentStore<ParkingState> {
    constructor(private parkingLotService: ParkingLotService) {
        super({
            cars: [],
            error: '',
            loading: false,
        })
    }

    //SELECTORES
    readonly vm$: Observable<ParkingState> = this.select((state) => state)

    // UPDATERS
    readonly updateError = this.updater((state: ParkingState, error: string) => {
        return {
            ...state,
            error,
        }
    })

    readonly setLoading = this.updater((state: ParkingState, loading: boolean) => {
        return {
            ...state,
            loading,
        }
    })

    readonly updateCars = this.updater((state: ParkingState, car: Car) => {
        return {
            ...state,
            error: '',
            cars: [...state.cars, car],
        }
    })

    // EFFECTS
    readonly addCarToParkingLot = this.effect((plate$: Observable<string>) => {
        return plate$.pipe(
            concatMap((plate: string) => {
                this.setLoading(true)
                return this.parkingLotService.add(plate).pipe(
                    tap({
                        next: (car) => this.updateCars(car),
                        error: (e) => this.updateError(e),
                    }),
                    finalize(() => {
                        this.setLoading(false)
                    }),
                    catchError(() => EMPTY)
                )
            })
        )
    })
}