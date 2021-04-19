import { Injectable } from '@angular/core';
import { IProduct } from './IProduct';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private productUrl = '/api/products';
    constructor(private http: HttpClient) { };

    getProducts(): Observable<IProduct[]> {
        const url = `${this.productUrl}`;
        return this.http.get<IProduct[]>(url).pipe(
            tap(data => console.log('All: ' + JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    getProduct(id: number): Observable<IProduct | undefined> {
        if (id === 0) { // id equals zero when adding a new product
            return of(this.initializedProduct());
        }
        const url = `${this.productUrl}/${id}`;

        return this.http.get<IProduct>(url).pipe(
            tap(data => console.log('getProduct: ' + JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    deleteProduct(id: number): Observable<IProduct | undefined> {
        return this.http.delete<IProduct[]>(this.productUrl).pipe(
            map((products: IProduct[]) => products.find(p => p.id === id)),
            catchError(this.handleError)
        );
    }

    updateProduct(product: IProduct): Observable<IProduct> {
        const url = `${this.productUrl}/${product.id}`;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

        return this.http.put<IProduct>(url, product, { headers })
            .pipe(
                tap(() => console.log('updateProduct: ' + product.id)),
                map(() => product),
                catchError(this.handleError)
            );
    }

    createProduct(product: IProduct): Observable<IProduct> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        product.id = null;//for fake-web-api
        return this.http.post<IProduct>(this.productUrl, product, { headers })
            .pipe(
                tap(data => console.log('createProduct: ' + JSON.stringify(data))),
                catchError(this.handleError)
            );
    }

    private handleError(err: HttpErrorResponse) {
        let errorMessage = '';
        if (err.error instanceof ErrorEvent) {
            errorMessage = `An error occurred: ' ${err.error.message}`;
        }
        else {
            errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }

        console.error(errorMessage);
        return throwError(errorMessage);
    }

    private initializedProduct(): IProduct {
        var d = new Date();
        var datestring = d.toLocaleString('default', { month: 'long', day: '2-digit', year:'numeric'});

        return {
            id: 0,
            description: null,
            productCode: null,
            starRating: null,
            imageUrl: null,
            price: null,
            productName: null,
            releaseDate: datestring
        }
    }
}