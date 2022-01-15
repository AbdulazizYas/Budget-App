import { useState } from "react";
import { Button, Container,Stack } from "react-bootstrap";
import AddBudgetModal from "./components/AddBudgetModal";
import AddExpenseModal from "./components/AddExpenseModal";
import BudgetCard from "./components/BudgetCard";
import UncategorizedBudgetCard from "./components/UncategorizedBudgetCard";
import TotalBudgetCard from "./components/TotalBudgetCard"
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "./contexts/Budgets";
import ViewExpensesModal from "./components/ViewExpensesModal";

function App() {

  const [showAddBudgetModal,setShowAddBudgetModal] = useState(false);
  const [showAddExpenseModal,setShowAddExpenseModal] = useState(false);
  const [addExpenseModalBudgetId,setAddExpenseModalBudgetId] = useState();
  const [viewExpensesModalBudgetId,setViewExpensesModalBudgetId] = useState();

  const {budgets, getBudgetExpenses} = useBudgets();

  function openExpenseModal(budgetId){
    setShowAddExpenseModal(true);
    if (budgetId)
      setAddExpenseModalBudgetId(budgetId);
  }

  return (
      <>
      <Container className="my-4">
        <Stack direction="horizontal" gap="2" className="mb-4" >
          <h2 className="me-auto">Budgets</h2>
          <Button variant="primary" onClick={() => setShowAddBudgetModal(true)}>Add Budget</Button>
          <Button variant="outline-primary" onClick={openExpenseModal}>Add Expense</Button>
        </Stack>

        <div style={{
          display:"grid",
          gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",
          gap:"1rem",
          alignItems:"flex-start"
        }}>

          {budgets.map(budget => {
            const amount = getBudgetExpenses(budget.id).reduce((total, expense) => total + expense.amount,0);

            return (
            <BudgetCard
            key={budget.id}
            name={budget.name} 
            amount={amount} 
            max={budget.max} 
            onAddExpenseClick={() => openExpenseModal(budget.id)}
            onViewExpensesClick={() => setViewExpensesModalBudgetId(budget.id)}/>
            )
          })}

          <UncategorizedBudgetCard 
          onAddExpenseClick={openExpenseModal}
          onViewExpensesClick={() => setViewExpensesModalBudgetId(UNCATEGORIZED_BUDGET_ID)}
          />

          <TotalBudgetCard />

        </div>
      </Container>
      <AddBudgetModal show={showAddBudgetModal} handleClose={() => setShowAddBudgetModal(false)} />
      <AddExpenseModal 
      defaultBudgetId={addExpenseModalBudgetId}
      show={showAddExpenseModal} 
      handleClose={() => setShowAddExpenseModal(false)} />

      <ViewExpensesModal
      budgetId={viewExpensesModalBudgetId}
      handleClose={() => setViewExpensesModalBudgetId()}  /> 
    </>
  );
}

export default App;
