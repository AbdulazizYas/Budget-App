import { useRef } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import {UNCATEGORIZED_BUDGET_ID, useBudgets} from "../contexts/Budgets";

export default function AddExpenseModal({show, handleClose, defaultBudgetId}) {

  const descriptionRef = useRef();
  const amountRef = useRef();
  const budgetIdRef = useRef();

  const {addExpense, budgets} = useBudgets();

  function handleSubmit(e){
    e.preventDefault();

    addExpense({
      description: descriptionRef.current.value,
      amount: parseFloat(amountRef.current.value),
      budgetId: budgetIdRef.current.value
    });

    handleClose();
  }
  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>

        <Modal.Header closeButton>
          <Modal.Title>New Expense</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control ref={descriptionRef} type="text" required/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="amount">
            <Form.Label>Amount</Form.Label>
            <Form.Control ref={amountRef} type="number" required min={0} step={0.01}/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="budgetId">

            <Form.Label>Budget</Form.Label>

            <Form.Select 
            defaultValue={defaultBudgetId}
            ref={budgetIdRef} 
            >
              <option value={UNCATEGORIZED_BUDGET_ID}>Uncategorized</option>

              {budgets.map(budget => (
                <option value={budget.id} key={budget.id}>{budget.name}</option>
              ))}
              
            </Form.Select>
          </Form.Group>
          
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" type="submit">Add</Button>
        </Modal.Footer>

      </Form>
    </Modal>
  )
}
