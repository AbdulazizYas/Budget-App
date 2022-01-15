import { createContext, useContext, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import useLocalStorage from "../hooks/useLocalStorage"

const BudgetsContext = createContext();

export const UNCATEGORIZED_BUDGET_ID = "uncategorized";

export function useBudgets(){
  return useContext(BudgetsContext);
}

export const BudgetProvider = ({children}) =>{

  const [budgets, setBudgets] = useLocalStorage("budgets",[]);
  const [expenses, setExpenses] = useLocalStorage("expenses",[]);

  function getBudgetExpenses(budgetId){
    return expenses.filter(expense => expense.budgetId === budgetId);
  }

  function addExpense({description,amount,budgetId}){
    setExpenses(prevE => {
      return [...prevE, {id: uuidV4(), description, amount,budgetId}];

    });
  }

  function addBudget({name,max}){
    setBudgets(prevB => {
      if (prevB.find(budget => budget.name === name)){    
        return prevB;
      }
      return [...prevB, {id: uuidV4(), name, max}];

    });
  }

  function deleteExpense({id}){
    setExpenses(expenses.filter(expense => expense.id !== id));
  }

  function deleteBudget({id}){
    setExpenses(prevE => {
      return prevE.map(expense => {
        if (expense.budgetId !== id) return expense;

        return {...expense, budgetId: UNCATEGORIZED_BUDGET_ID};
      });
    });

    setBudgets(budgets.filter(budget => budget.id !== id));
  }

  return <BudgetsContext.Provider value={{
    budgets,
    expenses,
    getBudgetExpenses,
    addExpense,
    addBudget,
    deleteExpense,
    deleteBudget
  }}>
    {children}
  </BudgetsContext.Provider>;
}