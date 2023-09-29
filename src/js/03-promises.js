
import Notiflix from 'notiflix';





const btn = document.querySelector('button')
const delay = document.querySelector('input[name="delay"]')
const step = document.querySelector('input[name="step"]')
const amount = document.querySelector('input[name="amount"]')


btn.addEventListener('click', onBtnSubmit)

function onBtnSubmit (event) {
 event.preventDefault()

 let delayVal = Number(delay.value)
 
 
 for (let i = 1; i <= amount.value; i += 1) {
  
  delayVal += Number(step.value)

  
  
  createPromise(i, delayVal).then(onFulfilled).catch(onReject)
 }
 

}

function createPromise(position, delay) {
  
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(()=> {
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`)
      } else {
        reject (`❌ Rejected promise ${position} in ${delay}ms`)
      }
    }, delay)

  })
  
}
function onFulfilled (result) {
  Notiflix.Notify.success(result);
  }
  function onReject (error) {
    Notiflix.Notify.failure(error);
  }