import Data from '@/types/Data'
export default interface SortCriteria {
  field: keyof Data
  order: 'asc' | 'desc'
}