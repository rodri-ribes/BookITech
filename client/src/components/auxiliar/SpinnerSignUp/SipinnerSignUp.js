import style from './SpinnerSignUp.module.css'

export default function SpinnerSignUp() {
    return (
        <div className={style.Container}>
            <div className={style.lds_ring}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}
