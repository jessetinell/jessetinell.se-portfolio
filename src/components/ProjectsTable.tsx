import { useMemo, useState } from 'react';
import { useTable, useSortBy } from 'react-table'
import Link from 'next/link'
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

import styled from 'styled-components'
import { Tag } from '@/styled-components'

const TableWrapper = styled.div`
overflow-x:auto;
`

const Table = styled.table`
td,th{
    border:none;
    border-bottom: 1px solid #606476;
    padding: 0.7em 0.5em;
    white-space: nowrap;
}
`

const Icon = styled.img`
width:1.7em;
margin-right:.6em;
`
const Desc = styled.div`
font-size:.8em;
`
const Verified = styled.div`
color:#a9afce;
font-size:.8em;
white-space:nowrap;


svg,small{
    display: inline-block;
    vertical-align:middle;
}

svg{
    width:1.2em;
    margin-left: .5em;
}
`

const TagCell = styled.div`
cursor:pointer;
max-width: 200px;
overflow: ${props => props.open ? 'none' : 'hidden'};
position:relative;
white-space: ${props => props.open ? 'initial' : 'nowrap'};
&:after{
    content: "";
    visibility: ${props => props.open ? 'hidden' : 'visible'};
    position: absolute;
    right: 0;
    height: 100%;
    width: 20%;
    background: linear-gradient(90deg, rgba(2,0,36,0) 0%, rgb(66 70 93) 100%);
}
`

const Edit = styled.div`
display:inline-block;
vertical-align:middle;
font-size:.3em;
margin-right:.3em;
`
const ExternalLink = styled.div`
display: inline-block;
svg{
    width: 0.6em;
    margin-left: 0.4em;
    opacity: 0.6;
}
`

const getLink = (original) => {

    if (original.url)
        return original.url;

    if (original.name.indexOf(' ') > -1)
        return null;

    if (original.name.indexOf('.se') > -1 || original.name.indexOf('.com') > -1)
        return 'http://' + original.name;

    return null;
}

export default function ProjectsTable({ projects }) {
    let data = projects;
    // const data = useMemo(() => projects, [])
    // console.log(data)
    // console.log(projects)
    const columns = useMemo(
        () => [
            {
                Header: 'Project',
                accessor: 'name',
                disableSortBy: true,
                Cell: (data) => {
                    const { row } = data;
                    let link = getLink(row.original);

                    return <>
                        {process.env.NODE_ENV === "development" && <Edit><Link href={`/edit/${row.original?._id}`}>edit</Link></Edit>}
                        {row.original?.icon ? <Icon src={row.original.icon} /> : null}
                        {link ? <ExternalLink>
                            <a href={link} target="_blank">
                                <span>{data.value}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#ffffff" d="M392.857 292.354h-18.274c-2.669 0-4.859.855-6.563 2.573-1.718 1.708-2.573 3.897-2.573 6.563v91.361c0 12.563-4.47 23.315-13.415 32.262-8.945 8.945-19.701 13.414-32.264 13.414H82.224c-12.562 0-23.317-4.469-32.264-13.414-8.945-8.946-13.417-19.698-13.417-32.262V155.31c0-12.562 4.471-23.313 13.417-32.259 8.947-8.947 19.702-13.418 32.264-13.418h200.994c2.669 0 4.859-.859 6.57-2.57 1.711-1.713 2.566-3.9 2.566-6.567V82.221c0-2.662-.855-4.853-2.566-6.563-1.711-1.713-3.901-2.568-6.57-2.568H82.224c-22.648 0-42.016 8.042-58.102 24.125C8.042 113.297 0 132.665 0 155.313v237.542c0 22.647 8.042 42.018 24.123 58.095 16.086 16.084 35.454 24.13 58.102 24.13h237.543c22.647 0 42.017-8.046 58.101-24.13 16.085-16.077 24.127-35.447 24.127-58.095v-91.358c0-2.669-.856-4.859-2.574-6.57-1.713-1.718-3.903-2.573-6.565-2.573z" /><path fill="#ffffff" d="M506.199 41.971c-3.617-3.617-7.905-5.424-12.85-5.424H347.171c-4.948 0-9.233 1.807-12.847 5.424-3.617 3.615-5.428 7.898-5.428 12.847s1.811 9.233 5.428 12.85l50.247 50.248-186.147 186.151c-1.906 1.903-2.856 4.093-2.856 6.563 0 2.479.953 4.668 2.856 6.571l32.548 32.544c1.903 1.903 4.093 2.852 6.567 2.852s4.665-.948 6.567-2.852l186.148-186.148 50.251 50.248c3.614 3.617 7.898 5.426 12.847 5.426s9.233-1.809 12.851-5.426c3.617-3.616 5.424-7.898 5.424-12.847V54.818c-.001-4.952-1.814-9.232-5.428-12.847z" /></svg>

                            </a>
                        </ExternalLink> : <span>{data.value}</span>}
                        {row.original.short_description && <Desc className="box-light-text">{row.original.short_description}</Desc>}

                    </>
                }
            },
            {
                Header: 'Role',
                accessor: 'role',
                Cell: (data) => {
                    const { row } = data;

                    if (data.value) {
                        if (data.value === "techlead") {
                            return <Verified title="Tech Lead + Fullstack Developer + Architect">
                                <small>Tech Lead</small>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 512c-26.4 0-45.2-19.8-60.4-35.7-6.4-7.8-14.1-14.5-22.7-19.8-10.5-2.6-21.4-3.5-32.2-2.5-22.7 0-48.3.9-66.4-17s-16.9-43.5-16.5-66.3c1-10.8.2-21.7-2.5-32.2-5.3-8.6-12-16.3-19.8-22.7C20.2 301.2 0 282.4 0 256s20.2-45.2 35.6-60.4c7.8-6.4 14.5-14.1 19.8-22.7 2.6-10.5 3.5-21.4 2.5-32.2 0-22.6-.9-48.3 17-66.3s43.6-17.5 66.4-17c10.8 1 21.7.2 32.2-2.5 8.6-5.3 16.3-12 22.7-19.8C210.8 20.2 229.6 0 256 0s45.2 20.2 60.4 35.7c6.4 7.8 14.1 14.5 22.7 19.8 10.5 2.6 21.4 3.5 32.2 2.5 22.7 0 48.3-.9 66.4 17s17.5 43.6 17 66.3c-1 10.8-.2 21.7 2.5 32.2 5.3 8.6 12 16.3 19.8 22.7 14.9 14.6 35.1 33.4 35.1 59.8s-20.2 45.2-35.6 60.4c-7.8 6.4-14.5 14.1-19.8 22.7-2.6 10.5-3.5 21.4-2.5 32.2 0 22.6.9 48.3-17 66.3s-43.6 17.5-66.4 17c-10.8-1-21.7-.2-32.2 2.5-8.6 5.3-16.3 12-22.7 19.8-14.7 14.9-33.5 35.1-59.9 35.1zM151.2 409.6c13.2-.6 26.3 1.4 38.7 5.9 14.5 7.3 27.4 17.6 37.7 30.1 9.3 9.8 21.4 22 28.3 22 6.9 0 19-12.2 28.3-22 10.4-12.5 23.2-22.8 37.7-30.1 15.9-5.3 32.7-7.3 49.4-5.8 12.4 0 29.6 0 34.2-4.1s4.3-21.4 4.1-34.2c-1.5-16.7.5-33.5 5.8-49.4 7.3-14.5 17.6-27.4 30.1-37.7 9.8-9.3 22-21.4 22-28.3s-12.2-19-22-28.3c-12.5-10.4-22.8-23.2-30.1-37.7-5.3-15.9-7.3-32.7-5.8-49.4 0-12.4 0-29.6-4.1-34.2s-21.4-4.4-34.2-4.1c-16.7 1.5-33.5-.5-49.4-5.8-14.5-7.3-27.4-17.6-37.7-30.1-9.3-9.8-21.4-22-28.3-22-6.9 0-19 12.2-28.3 22-10.4 12.5-23.2 22.8-37.7 30.1-15.9 5.3-32.7 7.3-49.4 5.8-12.4 0-29.6 0-34.2 4.1s-4.3 21.4-4.1 34.2c1.5 16.7-.5 33.5-5.8 49.4-7.3 14.5-17.6 27.4-30.1 37.7-9.8 9.3-22 21.4-22 28.3 0 6.9 12.2 19 22 28.3C78.8 294.7 89 307.5 96.4 322c5.3 15.9 7.3 32.7 5.8 49.4 0 12.4 0 29.6 4.1 34.2s21.4 4.3 34.2 4.1l10.7-.1z" fill="#dfe3f7" /><path d="M234.6 331.7c-5 0-9.9-1.7-13.8-4.8L167.1 284c-9.5-7.6-11.1-21.6-3.4-31.1s21.6-11.1 31.1-3.4L233 280l82.4-82.4c8.6-8.6 22.7-8.6 31.3 0s8.6 22.7 0 31.3l-96.5 96.5c-4.2 4.1-9.8 6.3-15.6 6.3z" fill="#94c7ff" /></svg>
                            </Verified>
                        }
                        if (data.value === "productowner") {
                            return <Verified>
                                <small>Product Owner</small>
                                <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m419.25 277.976562h-326.5c-4.988281 0-9.648438-2.464843-12.457031-6.585937-43.078125-63.171875-46.382813-184.691406-46.632813-202.730469-.015625-.707031-.023437-1.421875-.023437-2.132812 0-8.316406 6.734375-15.0625 15.050781-15.078125h.03125c8.300781 0 15.046875 6.714843 15.078125 15.019531 0 .101562.003906.992188.039063 2.570312 1.328124 42.902344 36.644531 77.390626 79.863281 77.390626 44.058593 0 79.902343-35.84375 79.902343-79.902344 0-8.328125 6.753907-15.078125 15.078126-15.078125h34.636718c8.328125 0 15.078125 6.75 15.078125 15.078125 0 44.058594 35.847657 79.902344 79.90625 79.902344 43.257813 0 78.597657-34.550782 79.867188-77.507813.027343-1.507813.035156-2.351563.035156-2.449219.03125-8.308594 6.773437-15.023437 15.078125-15.023437h.027344c8.316406.015625 15.050781 6.761719 15.050781 15.078125 0 .714844-.007813 1.425781-.019531 2.136718-.253906 18.035157-3.558594 139.558594-46.632813 202.730469-2.808593 4.117188-7.472656 6.582031-12.457031 6.582031zm0 0" fill="#fff780" /><path d="m463.308594 51.449219c-.007813 0-.015625 0-.027344 0-8.300781 0-15.046875 6.714843-15.078125 15.019531 0 .101562-.003906.945312-.035156 2.453125-1.269531 42.953125-36.609375 77.507813-79.867188 77.507813-44.058593 0-79.902343-35.84375-79.902343-79.902344 0-8.328125-6.753907-15.078125-15.078126-15.078125h-17.316406v226.523437h163.246094c4.988281 0 9.648438-2.464844 12.457031-6.582031 43.078125-63.171875 46.382813-184.695313 46.632813-202.730469.015625-.707031.023437-1.421875.023437-2.132812-.003906-8.316406-6.738281-15.0625-15.054687-15.078125zm0 0" fill="#ffc02e" /><path d="m256 0c-26.863281 0-48.71875 21.855469-48.71875 48.71875s21.855469 48.714844 48.71875 48.714844 48.71875-21.851563 48.71875-48.714844-21.855469-48.71875-48.71875-48.71875zm0 0" fill="#ffc02e" /><path d="m256.003906 0v97.4375c26.863282-.003906 48.714844-21.855469 48.714844-48.71875s-21.855469-48.71484375-48.714844-48.71875zm0 0" fill="#ffa73b" /><path d="m48.71875 37.597656c-26.863281 0-48.71875 21.855469-48.71875 48.71875 0 26.863282 21.855469 48.71875 48.71875 48.71875s48.714844-21.855468 48.714844-48.71875c0-26.863281-21.851563-48.71875-48.714844-48.71875zm0 0" fill="#ffc02e" /><path d="m463.28125 37.597656c-26.863281 0-48.714844 21.855469-48.714844 48.71875 0 26.859375 21.851563 48.714844 48.714844 48.714844s48.71875-21.855469 48.71875-48.714844c0-26.863281-21.855469-48.71875-48.71875-48.71875zm0 0" fill="#ffa73b" /><path d="m419.25 327.441406h-326.5c-8.328125 0-15.078125-6.75-15.078125-15.078125v-44.964843h356.65625v44.964843c0 8.328125-6.75 15.078125-15.078125 15.078125zm0 0" fill="#ffc02e" /><path d="m256.003906 327.441406h163.246094c8.328125 0 15.078125-6.75 15.078125-15.078125v-44.964843h-178.324219zm0 0" fill="#ffa73b" /></svg>
                            </Verified>
                        }
                        if (data.value === "indiehacker") {
                            return <Verified title="Indie Hacker = Personal side project">
                                <small>Indie Hacker</small>
                            </Verified>
                        }
                        if (data.value === "developer") {
                            return <Verified>
                                <small>Fullstack Developer</small>
                            </Verified>
                        }

                    }
                    return null;
                }
            },
            {
                Header: 'When',
                accessor: 'years',
                disableSortBy: true,
                Cell: (data) => {
                    const { row } = data;
                    if (row.original.year_from) {
                        return <div>
                            {row.original.year_from}
                            {row.original.year_to !== row.original.year_from ? <>
                                -{row.original.year_to === 0 ? "present" : row.original.year_to}
                            </> : null}
                        </div>
                    }
                    else return null
                }
            },
            {
                Header: 'Stack',
                accessor: 'technologies',
                disableSortBy: true,
                Cell: (data) => {
                    const [open, setOpen] = useState(false)
                    return <TagCell open={open} onClick={() => setOpen(!open)}>
                        {data.value.map((value, i) => {
                            return <Tag key={i}>{value.name}</Tag>
                        })}
                    </TagCell>
                }
            },
        ],
        []
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data }, useSortBy)

    if (!projects.length) {
        return <SkeletonTheme color="#33354a" highlightColor="#42455D">
            <Skeleton height={50} />
            <Skeleton height={500} />
        </SkeletonTheme>
    }

    return (

        <TableWrapper>
            <Table {...getTableProps()} >
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render('Header')}
                                    <span>{column.isSorted ? (column.isSortedDesc ? ' 👇' : ' 👆') : ''}</span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map(row => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return (
                                        <td
                                            {...cell.getCellProps()}>
                                            {cell.render('Cell')}
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </TableWrapper>
    )
}