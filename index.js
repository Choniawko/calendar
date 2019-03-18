const calendar = new Calendar(1)
const currDate = new Date()

const initialState = {
  year: currDate.getFullYear(),
  month: currDate.getMonth(),
}
const currMonth = (year, month) => calendar.monthDays(year, month)

const incrementMonth = current => (current === 11 ? 0 : current + 1)
const decrementMonth = current => (current === 0 ? 11 : current - 1)
const incrementYear = (incMonth, currentYear) => (incMonth === 0 ? currentYear + 1 : currentYear)
const decrementYear = (decMonth, currentYear) => (decMonth === 11 ? currentYear - 1 : currentYear)

const renderDay = day => `<div class="day">${day || ""}</div>`
const renderWeek = week => `<div class="week"> ${week.map(renderDay).join("")}</div>`
const renderMonth = month => `<div class="month">${month.map(renderWeek).join("")}</div>`

const counter = (state = initialState, { type }) => {
  switch (type) {
    case "INCRENENT":
      return {
        ...state,
        month: incrementMonth(state.month),
        year: incrementYear(incrementMonth(state.month), state.year),
      }
    case "DECREMENT":
      return {
        ...state,
        month: decrementMonth(state.month),
        year: decrementYear(decrementMonth(state.month), state.year),
      }
    default:
      return state
  }
}
const store = Redux.createStore(counter)
const calendarEl = document.querySelector("#calendar")
const render = () => {
  const { year, month } = store.getState()
  calendarEl.innerHTML = renderMonth(currMonth(year, month))
}
render()
store.subscribe(render)

document.querySelector(".prev").addEventListener("click", () => {
  store.dispatch({ type: "DECREMENT" })
})
document.querySelector(".next").addEventListener("click", () => {
  store.dispatch({ type: "INCRENENT" })
})
