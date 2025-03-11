import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import { BiPaperPlane, BiCloudDownload } from "react-icons/bi";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import dayjs from "dayjs";

const GenerateInvoice = () => {
  html2canvas(document.querySelector("#invoiceCapture")).then((canvas) => {
    const imgData = canvas.toDataURL("image/png", 1.0);
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: [612, 792],
    });
    pdf.internal.scaleFactor = 1;
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("invoice-001.pdf");
  });
};

const InvoiceModal = ({ showModal, closeModal, allorders }) => {
  console.log(allorders, "allorders");

  return (
    <Modal show={showModal} onHide={closeModal} size="lg" centered>
      <div id="invoiceCapture">
        <div className="d-flex flex-row justify-content-between align-items-start bg-light w-100 p-4">
          <div className="w-100">
            <h4 className="fw-bold my-2">{allorders?.fullName || ""}</h4>
            <h6 className="fw-bold text-secondary mb-1">
              Invoice #: {allorders?._id || ""}
            </h6>
          </div>
          <div className="text-end ms-4">
            <h6 className="fw-bold mt-1 mb-2">Amount&nbsp;Due:</h6>
            <h5 className="fw-bold text-secondary">
              {allorders?.totalPrice || ""}
            </h5>
          </div>
        </div>
        <div className="p-4">
          <Row className="mb-4">
            <Col md={4}>
              <div className="fw-bold">Billed to:</div>
              <div>{allorders?.phoneNumber || ""}</div>
              <div>{allorders?.address || ""}</div>
              <div>{allorders?.user?.email || ""}</div>
            </Col>
            <Col md={4}>
              <div className="fw-bold">Billed From:</div>
              {/* <div>{info.billFrom || ""}</div>
              <div>{info.billFromAddress || ""}</div>
              <div>{info.billFromEmail || ""}</div> */}
            </Col>
            <Col md={4}>
              <div className="fw-bold mt-2">Date Of Issue:</div>
              <div>{dayjs(allorders?.createdAt).format("DD-MM-YYYY")}</div>
            </Col>
          </Row>
          <Table className="mb-0">
            <thead>
              <tr>
                <th>QTY</th>
                <th>DESCRIPTION</th>
                <th className="text-end">PRICE</th>
                <th className="text-end">AMOUNT</th>
              </tr>
            </thead>
            <tbody>
              {allorders?.products?.map((item, i) => (
                <tr key={i}>
                  <td style={{ width: "70px" }}>{item?.quantity}</td>
                  <td>{item.name}</td>
                  <td className="text-end" style={{ width: "100px" }}>
                    {item?.price}
                  </td>
                  <td className="text-end" style={{ width: "100px" }}>
                    {item?.price * item?.quantity}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Table>
            <tbody>
              <tr className="text-end">
                <td></td>
                <td className="fw-bold" style={{ width: "100px" }}>
                  SUBTOTAL
                </td>
                <td className="text-end" style={{ width: "100px" }}>
                  {allorders?.totalPrice || ""}
                </td>
              </tr>
              {/* {taxAmmount !== 0.0 && (
                <tr className="text-end">
                  <td></td>
                  <td className="fw-bold" style={{ width: "100px" }}>
                    TAX
                  </td>
                  <td className="text-end" style={{ width: "100px" }}>
                    {currency} {taxAmmount}
                  </td>
                </tr>
              )} */}
              {/* {discountAmmount !== 0.0 && (
                <tr className="text-end">
                  <td></td>
                  <td className="fw-bold" style={{ width: "100px" }}>
                    DISCOUNT
                  </td>
                  <td className="text-end" style={{ width: "100px" }}>
                    {currency} {discountAmmount}
                  </td>
                </tr>
              )} */}
              <tr className="text-end">
                <td></td>
                <td className="fw-bold" style={{ width: "100px" }}>
                  TOTAL
                </td>
                <td className="text-end" style={{ width: "100px" }}>
                  {allorders?.totalPrice || ""}
                </td>
              </tr>
            </tbody>
          </Table>
          {/* {info.notes && (
            <div className="bg-light py-3 px-4 rounded">{info.notes}</div>
          )} */}
        </div>
      </div>
      <div className="pb-4 px-4">
        <Row>
          <Col md={6}>
            <Button
              variant="primary"
              className="flex items-center h-100 w-100"
              onClick={GenerateInvoice}
            >
              <div>
                <BiPaperPlane
                  style={{ width: "20px", height: "20px" }}
                  className="me-2"
                />
              </div>
              <div>Send Invoice</div>
            </Button>
          </Col>
          <Col md={6}>
            <Button
              variant="outline-primary"
              className="flex items-center justify-center h-100 w-100"
              onClick={GenerateInvoice}
            >
              <div>
                <BiCloudDownload
                  style={{ width: "20px", height: "20px" }}
                  className="me-2"
                />
              </div>
              <div>Download Copy</div>
            </Button>
          </Col>
        </Row>
      </div>
      <hr className="mt-4 mb-3" />
    </Modal>
  );
};

export default InvoiceModal;
