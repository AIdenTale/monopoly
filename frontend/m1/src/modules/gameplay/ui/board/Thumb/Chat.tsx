import ct from './chat.m.scss'

export const Chat = () => {
    return (
        <div className={ct.chat}>
			<div className={ct.chat__inner}>
                <div className={ct.chat__text_area}></div>
                <div className={ct.chat__input__block} >
                    <input type="text" placeholder='Введите сообщение..' />
                </div>
            </div>
		</div>
    )
}