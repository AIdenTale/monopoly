import cls from "./attention.m.scss"

export const AttenttionTable = (props: any) => {
    return (
        <div ref={props.refm} className={cls.attention__block}>
            <div className={cls.attention__block__inner}>
                <p>Бросьте кубики</p>
                {/* props.buttonRef.current.player_move(Math.floor(Math.random() * 15) +1)} */}
                <button onClick={() => {props.buttonRef.current.drop_cube()}}>Бросить кубики</button>
            </div>
        </div>
    )
}

export const ChooseTable = (props: any) => {
    return (
        <div ref={props.refm} className={cls.attention__block} 
        style={{
            display: 'none'
        }}>
            <div className={cls.attention__block__inner}>
                <p>Купить ... за ... ?</p>
                <div className={cls.attention__buttons}>
                    <button>Купить</button>
                    <button>Отказаться</button>
                </div>
            </div>
        </div>
    )
    
}