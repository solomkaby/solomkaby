import { $inputUserName, $inputUserPhone, $btnSendForm } from './validator'
import { getCorrectCallLink } from '../utils'
import { getFullDate } from '../utils'
import { showModal } from '../UI/modal'

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

	try {
		$btnSendForm.classList.add('_disable')

		const response = await emailjs.send('service_solomka_id', 'solomka_email_id', sendData, 'user_CQyKldP8r2sZRGhvJbXfs')

		if (response.status > 399) {
			throw new Error('Произошел сбой сервера, попробуйте отправить сообщение позже')
		} else {
			showModal('success', name, 'Мы перезвоним вам в ближайшее время')
		}
	} catch (error) {
		showModal('error', 'Сообщение не отправлено!', 'Произошел сбой сервера, попробуйте отправить сообщение позже.')
	}

	clearFomr()
}

const clearFomr = () => {
	$inputUserName.value = ''
	$inputUserPhone.value = ''
}
