import { CustomSelect } from './_components/CustomSelect'

const list1 = Array(10)
  .fill(null)
  .map((_, i) => i + 1)

const list2 = Array(3)
  .fill(null)
  .map((_, i) => i + 1)

export default function Page() {
  return (
    <div className="m-12">
      <CustomSelect list={list1} />
      <CustomSelect list={list2} />
    </div>
  )
}
