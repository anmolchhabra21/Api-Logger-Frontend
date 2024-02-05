// Packages:
import styled from 'styled-components'


// Exports:
export const Wrapper = styled.div`
  position: relative;
  width: 100%;
  box-shadow: rgba(136, 165, 191, 0.48) 2px 3px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px;
  background: #ffffff;
  height: 100%;
  padding: 5px;
  max-height: 730px;
  border-radius: 4px;
  color: #333333;
`

export const RecordsTable = styled.table`
  width: 100%;
  height: 600px;
  text-align: center;
  font-size: 14px;
  transform: translateY(0px);
  overflow: hidden;
  margin: 0 auto;
  border-collapse: collapse;

  td {
    padding: 7px 6px;
  }

  tr {
    min-height: 48px;
    overflow: hidden;
  }
`

export const Header = styled.thead`
  background: #ffffff;
`
export const Body = styled.tbody`
  tr:nth-child(even) {
    background: #F4F4F9;
  }

  tr:hover {
    background: #e8f0fe;
    cursor: pointer;
    transition: all 0.25s ease;
  }
`

export const Title = styled.tr`
  th {
    height: 50px;
    padding: 12px 6px;
    cursor: pointer;
  }
`

export const Filters = styled.tr`
  th {
    height: 50px;
    padding: 7px 5px;
    background: #F4F4F9;
  }
`

export const Badge = styled.div`
  background-color: #2F80ED;
  color: #FFFFFF;
  font-size: 0.7rem;
  padding: 10px 7px;
  border-radius: 4px;
  display: flex;
  align-items: end;
  gap: 6px;
  width: fit-content;
  margin: 0 auto;
  flex-direction: row-reverse;
`