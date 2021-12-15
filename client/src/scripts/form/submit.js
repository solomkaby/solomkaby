import { $inputUserName, $inputUserPhone, $btnSendForm } from './validator'
import { getCorrectCallLink } from '../utils'
import { getFullDate } from '../utils'
// import { handlerRequest } from '../request'
import { showModalSuccess } from '../UI/modal'

import emailjs from 'emailjs-com'

export const submitForm = async e => {
	e.preventDefault()
	
	if ($btnSendForm.classList.contains('_disable')) return

	const { value: name } = $inputUserName
	const { value: phone } = $inputUserPhone

	const sendData = {
		callLink: getCorrectCallLink(phone),
		date: getFullDate(),
		name,
		phone,
	}
	
	clearFomr()
	await emailjs.send('service_solomka_id', 'solomka_email_id', sendData, 'user_CQyKldP8r2sZRGhvJbXfs')
	await showModalSuccess(name)

	// handlerRequest('/', 'POST', userData).then(data => {
	// 	const { name, status } = data

	// 	if (status === 200) {
		// showModalSuccess(name)
		// clearFomr()
	// console.log(data)
	// 	}
	// })
}

const clearFomr = () => {
	$inputUserName.value = ''
	$inputUserPhone.value = ''
	$btnSendForm.classList.add('_disable')
}
