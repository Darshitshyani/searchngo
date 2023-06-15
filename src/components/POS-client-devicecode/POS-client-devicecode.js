import React, { useEffect, useState } from "react";
import { Col, Row, Card, Tabs, Tab } from "react-bootstrap";
import useApi from "../../hooks/useApi";
import { baseUrl } from "../../constants/endpoints";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { ROLES_SLUG } from "../../constants/strings";
import ActiveList from "./ActiveList";


export default function Posdevicecode() {
  const [datalist, setDataList] = useState([]);
  const _USER = useSelector(e => e?.common);
  const api = useApi();

  useEffect(() => {
    if (_USER?.role?.length) {
      getList()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_USER?.role])

  const getList = async () => {
    const { data, error } = await api.get(`${baseUrl}/api/${ROLES_SLUG[_USER?.role]}/pos-device-code`);
    if (data) {
      setDataList(data.data.list)
    }
    else {
      toast.error(error, {
        position: toast.POSITION.TOP_RIGHT,
        hideProgressBar: false,
        autoClose: 2000,
        theme: "colored",
      });
    }
  }
  const handleStatus = async (row, value) => {
    const activeObj = {
      pos_device_code: row.pos_device_code ?row.pos_device_code :"" ,
      device_name: row.device_name ? row.device_name:"D1",
      device_model: row.device_model ? row.device_model:"D123",
      device_mac_address: row.device_mac_address ? row.device_mac_address : "asdassd:2323:343",
    }
    const deActiveObj = {
      pos_device_code: row.pos_device_code,
    }
    let data;
    if (value === true) {
      data = await api.post(`${baseUrl}/api/${ROLES_SLUG[_USER?.role]}/pos-device-code/activation`, activeObj);
    } else {
      data = await api.post(`${baseUrl}/api/${ROLES_SLUG[_USER?.role]}/pos-device-code/deactivation`, deActiveObj);
    }
    if (data?.data) {
      toast.success(data?.data.message ? data?.data.message : data?.data.messages, {
        position: toast.POSITION.TOP_RIGHT,
        hideProgressBar: false,
        autoClose: 2000,
        theme: "colored",
      });
      getList()
    }
  }

  return (
    <div>
      <Row>
        <Col sm={12} className="col-12">
          <Card className="mt-5">
            <Card.Header className="d-flex align-items-center justify-content-between">
              <h3 className="card-title mb-0">POS Device Code</h3>
            </Card.Header>
            <Card.Body>
              <div className="panel panel-primary">
                <div className=" tab-menu-heading border">
                  <div className="tabs-menu1 tabstyle2">
                    <Tabs
                      className=" panel-tabs "
                      variant="pills"
                      defaultActiveKey="ActivePosDeviceList"
                    >
                      <Tab eventKey="ActivePosDeviceList" className="me-1 " title="Active POS Device Code List">
                        <div className="salesdatatable">
                          <div className="table-responsive">
                            <ActiveList
                              data={datalist}
                              handleStatus={(row, value) => handleStatus(row, value)}
                            />
                          </div>
                        </div>
                      </Tab>

                    </Tabs>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}