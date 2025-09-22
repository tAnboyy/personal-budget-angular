import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface BudgetItem {
  title: string;
  budget: number;
}

export interface BudgetResponse {
  myBudget: BudgetItem[];
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private budgetData: BudgetItem[] = [];
  private budgetDataSubject = new BehaviorSubject<BudgetItem[]>([]);
  
  // Observable that components can subscribe to
  public budgetData$ = this.budgetDataSubject.asObservable();

  constructor(private http: HttpClient) { }

  /**
   * Fetches budget data from the backend API
   * @returns Observable<BudgetResponse>
   */
  fetchBudgetData(): Observable<BudgetResponse> {
    return this.http.get<BudgetResponse>('http://localhost:3000/budget').pipe(
      tap((response: BudgetResponse) => {
        this.budgetData = response.myBudget;
        this.budgetDataSubject.next(this.budgetData);
      })
    );
  }

  /**
   * Gets the current budget data (synchronous)
   * @returns BudgetItem[]
   */
  getBudgetData(): BudgetItem[] {
    return this.budgetData;
  }

  /**
   * Gets budget data as an observable (reactive)
   * @returns Observable<BudgetItem[]>
   */
  getBudgetDataObservable(): Observable<BudgetItem[]> {
    return this.budgetData$;
  }

  /**
   * Checks if budget data is available
   * @returns boolean
   */
  hasBudgetData(): boolean {
    return this.budgetData.length > 0;
  }
}