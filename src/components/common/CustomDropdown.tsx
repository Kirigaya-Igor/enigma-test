import React from "react";

type CustomDropdownType = {
    title: string
    data: Array<{ name: string, value: string }>
    type: string
    checkedState?: Array<boolean>
    isRadioSelected?: (value: string) => boolean
    handleOnChange: (value: any) => void
}

export const CustomDropdown: React.FC<CustomDropdownType> = ({ title, data, type, checkedState, isRadioSelected, handleOnChange }) => {
    return (
        <li className="nav-item dropdown" onClick={e => e.stopPropagation()}>
            <span className="nav-link dropdown-toggle" id="navbarDarkDropdownMenu1" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                {title}
            </span>
            <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenu1">
                {data.map((item, index) => {
                    const id = Math.random().toString(36).slice(2)
                    return (
                    <li key={item.value + index}>
                        <input
                            type={type}
                            className="btn-check"
                            id={type === 'checkbox' ? `custom-checkbox-${index}-${id}` : type === 'radio' ? `custom-radio-${index}-${id}` : undefined}
                            value={item.value}
                            checked={type === 'checkbox' && checkedState ? checkedState[index] : type === 'radio' && isRadioSelected ? isRadioSelected(item.value) : undefined}
                            // @ts-ignore
                            onChange={type === 'checkbox' ? () => handleOnChange(index) : type === 'radio' ? handleOnChange : undefined}
                        />
                        <label className="btn btn-outline-light btn-sm customCheckbox"
                            htmlFor={type === 'checkbox' ? `custom-checkbox-${index}-${id}` : type === 'radio' ? `custom-radio-${index}-${id}` : undefined}>
                            {item.name}
                        </label>
                    </li>
                )})}
            </ul>
        </li>
    )
}