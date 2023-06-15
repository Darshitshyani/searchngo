import React from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import { Link } from 'react-router-dom';
import { statusCheck } from '../../../../constants/functions';

function DeactivePackageWise(props) {
    const { data, handleAssignView } = props
    const columns = [
        {
            name: "NAME",
            selector: row => [row.original_package_name],
            sortable: true,
            cell: row => <div className="d-flex">
                <div className="ms-2 mt-0 mt-sm-2 d-block">
                    <h6 className="mb-0 fs-14 fw-semibold">{row.full_name}</h6>
                </div>
            </div>
        },
        {
            name: "BUSINESS NAME",
            selector: row => [row.original_package_code],
            sortable: true,
            cell: row => <span className="text-muted mb-0 fs-14 fw-semibold">{row.business_name}</span>
        },
        {
            name: "CITY",
            selector: row => [row.attached_uuid],
            sortable: true,
            cell: row => <span className="text-muted mb-0 fs-14 fw-semibold">{row.city}</span>
        },
        {
            name: "COUNTRY",
            selector: row => [row.country],
            sortable: true,
            cell: row => <span className="text-muted mb-0 fs-14 fw-semibold">{row.original_package_speed}</span>
        },
        {
            name: "PHONE",
            selector: row => [row.original_package_speed],
            sortable: true,
            cell: row => <span className="text-muted mb-0 fs-14 fw-semibold">{row.phone}</span>
        },
        {
            name: "CREATED AT",
            selector: row => [row.created_at],
            sortable: true,
            cell: row => <span className="text-muted mb-0 fs-14 fw-semibold">{row.created_at}</span>
        },
        {
            name: "STATUS",
            selector: row => [row.original_package_status],
            sortable: true,
            cell: row => <span className={`text-${row.original_package_status.toString() === "1" ? "green" : "red"} fs-15 fw-semibold`}>{statusCheck(row.original_package_status.toString())}</span>
        },
        {
            name: "ACTION",
            selector: row => [row.action],
            sortable: true,
            cell: row => <span className="">
                <OverlayTrigger placement="top" overlay={<Tooltip >View</Tooltip>}>
                    <Link to="#" onClick={() => handleAssignView(row)} className="btn btn-info btn-sm rounded-11 my-1 me-2"> <i> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-eye"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg> </i> </Link>
                </OverlayTrigger>
            </span>
        }
    ]
    const tableDatas = {
        columns,
        data,
    };
    return (
        <DataTableExtensions {...tableDatas} >
            <DataTable
                columns={columns}
                data={data}
                noHeader
                defaultSortField="id"
                defaultSortAsc={false}
                striped={true}
                center={true}
                persistTableHead
                pagination
                highlightOnHover />
        </DataTableExtensions>
    )
}

export default DeactivePackageWise