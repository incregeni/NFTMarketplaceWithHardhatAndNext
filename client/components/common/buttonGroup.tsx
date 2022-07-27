import { FC } from "react";

export interface IButtonGroup {
   items: ButtonGroupItemType[],
   handleButtonGroup: (item:ButtonGroupItemType) => (ev:React.MouseEvent) => void
}

export type ButtonGroupItemType = {
  id: string;
  title: string;
  active: boolean;
}

const styles = {
  buttonGroup: 'flex items-center justify-center',
  buttonGroupItem : 'p-2 rounded-3xl cursor-pointer bg-[#0f1c39] w-[130px] mx-[10px]',
  buttonGroupActive: 'bg-gradient-to-r from-[#1199fa] to-[#11d0fa]',
}

export const ButtonGroup:FC<IButtonGroup> = ({ items, handleButtonGroup }) => {
  return (
    <div className={styles.buttonGroup}>
    {items.map((item:ButtonGroupItemType) =>(
      <button key={item.id} className={`${styles.buttonGroupItem} ${item.active ? styles.buttonGroupActive : '' }`} onClick={handleButtonGroup(item)}>{item.title}</button>
    ))}
  </div>
  )
}

