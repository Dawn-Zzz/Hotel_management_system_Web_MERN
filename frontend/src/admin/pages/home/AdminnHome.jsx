import React, { useEffect, useRef, useState } from "react";
import Loading from "../../../components/loading/Loading";
import { CChartBar, CChartLine } from "@coreui/react-chartjs";
import {
  CCard,
  CCardBody,
  CRow,
  CCol,
  CButton,
  CButtonGroup,
  CWidgetStatsA,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
} from "@coreui/react";
import CIcon from '@coreui/icons-react';
import { getStyle } from '@coreui/utils'

const AdminHome = () => {
  const [isLoading, setIsLoading] = useState(false); // Set mặc định là false để tránh lỗi
  const chartRef = useRef(null);

  useEffect(() => {
    document.documentElement.addEventListener("ColorSchemeChange", () => {
      if (chartRef.current) {
        setTimeout(() => {
          chartRef.current.options.scales.x.grid.borderColor =
            "rgba(0,0,0,0.1)";
          chartRef.current.options.scales.x.grid.color = "rgba(0,0,0,0.1)";
          chartRef.current.options.scales.x.ticks.color = "#000";
          chartRef.current.options.scales.y.grid.borderColor =
            "rgba(0,0,0,0.1)";
          chartRef.current.options.scales.y.grid.color = "rgba(0,0,0,0.1)";
          chartRef.current.options.scales.y.ticks.color = "#000";
          chartRef.current.update();
        });
      }
    });
  }, [chartRef]);

  const random = () => Math.round(Math.random() * 100);

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <div className="text-[40px] font-semibold text-gray-600 mb-8">
        Dashboard
      </div>
      {/* <WidgetsDropdown className="mb-4" /> */}
      <CRow>
        <CCol xs={12} sm={6} xxl={3}> 
          <CWidgetStatsA
            className="mb-4"
            color={getStyle('--cui-primary')}
            value={
              <>
                $9.000{" "}
                <span className="fs-6 fw-normal">
                  {/* (40.9% <CIcon icon={cilArrowTop} />) */}
                </span>
              </>
            }
            title="Widget title"
            action={
              <CDropdown alignment="end">
                <CDropdownToggle
                  color={getStyle('--cui-transparent')}
                  caret={false}
                  className="p-0"
                >
                  {/* <CIcon icon={cilOptions} className="text-white" /> */}
                </CDropdownToggle>
                <CDropdownMenu>
                  <CDropdownItem>Action</CDropdownItem>
                  <CDropdownItem>Another action</CDropdownItem>
                  <CDropdownItem>Something else here...</CDropdownItem>
                  <CDropdownItem disabled>Disabled action</CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
            }
            chart={
              <CChartLine
                className="mt-3 mx-3"
                style={{ height: "70px" }}
                data={{
                  labels: [
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                  ],
                  datasets: [
                    {
                      label: "My First dataset",
                      backgroundColor: "transparent",
                      borderColor: "rgba(255,255,255,.55)",
                      pointBackgroundColor: "#5856d6",
                      data: [65, 59, 84, 84, 51, 55, 40],
                    },
                  ],
                }}
                options={{
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                  maintainAspectRatio: false,
                  scales: {
                    x: {
                      border: {
                        display: false,
                      },
                      grid: {
                        display: false,
                        drawBorder: false,
                      },
                      ticks: {
                        display: false,
                      },
                    },
                    y: {
                      min: 30,
                      max: 89,
                      display: false,
                      grid: {
                        display: false,
                      },
                      ticks: {
                        display: false,
                      },
                    },
                  },
                  elements: {
                    line: {
                      borderWidth: 1,
                      tension: 0.4,
                    },
                    point: {
                      radius: 4,
                      hitRadius: 10,
                      hoverRadius: 4,
                    },
                  },
                }}
              />
            }
          />
        </CCol>
        <CCol sm={6}>
          <CWidgetStatsA
            className="mb-4"
            color={getStyle('--cui-info')}
            value={
              <>
                $9.000{" "}
                <span className="fs-6 fw-normal">
                  {/* (40.9% <CIcon icon={cilArrowTop} />) */}
                </span>
              </>
            }
            title="Widget title"
            action={
              <CDropdown alignment="end">
                <CDropdownToggle
                  color="transparent"
                  caret={false}
                  className="p-0"
                >
                  {/* <CIcon icon={cilOptions} className="text-white" /> */}
                </CDropdownToggle>
                <CDropdownMenu>
                  <CDropdownItem>Action</CDropdownItem>
                  <CDropdownItem>Another action</CDropdownItem>
                  <CDropdownItem>Something else here...</CDropdownItem>
                  <CDropdownItem disabled>Disabled action</CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
            }
            chart={
              <CChartLine
                className="mt-3 mx-3"
                style={{ height: "70px" }}
                data={{
                  labels: [
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                  ],
                  datasets: [
                    {
                      label: "My First dataset",
                      backgroundColor: "transparent",
                      borderColor: "rgba(255,255,255,.55)",
                      pointBackgroundColor: "#39f",
                      data: [1, 18, 9, 17, 34, 22, 11],
                    },
                  ],
                }}
                options={{
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                  maintainAspectRatio: false,
                  scales: {
                    x: {
                      border: {
                        display: false,
                      },
                      grid: {
                        display: false,
                        drawBorder: false,
                      },
                      ticks: {
                        display: false,
                      },
                    },
                    y: {
                      min: -9,
                      max: 39,
                      display: false,
                      grid: {
                        display: false,
                      },
                      ticks: {
                        display: false,
                      },
                    },
                  },
                  elements: {
                    line: {
                      borderWidth: 1,
                    },
                    point: {
                      radius: 4,
                      hitRadius: 10,
                      hoverRadius: 4,
                    },
                  },
                }}
              />
            }
          />
        </CCol>
        <CCol sm={6}>
          <CWidgetStatsA
            className="mb-4"
            color={getStyle('--cui-warning')}
            value={
              <>
                $9.000{" "}
                <span className="fs-6 fw-normal">
                  {/* (40.9% <CIcon icon={cilArrowTop} />) */}
                </span>
              </>
            }
            title="Widget title"
            action={
              <CDropdown alignment="end">
                <CDropdownToggle
                  color="transparent"
                  caret={false}
                  className="p-0"
                >
                  {/* <CIcon icon={cilOptions} className="text-white" /> */}
                </CDropdownToggle>
                <CDropdownMenu>
                  <CDropdownItem>Action</CDropdownItem>
                  <CDropdownItem>Another action</CDropdownItem>
                  <CDropdownItem>Something else here...</CDropdownItem>
                  <CDropdownItem disabled>Disabled action</CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
            }
            chart={
              <CChartLine
                className="mt-3"
                style={{ height: "70px" }}
                data={{
                  labels: [
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                  ],
                  datasets: [
                    {
                      label: "My First dataset",
                      backgroundColor: "rgba(255,255,255,.2)",
                      borderColor: "rgba(255,255,255,.55)",
                      data: [78, 81, 80, 45, 34, 12, 40],
                      fill: true,
                    },
                  ],
                }}
                options={{
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                  maintainAspectRatio: false,
                  scales: {
                    x: {
                      display: false,
                    },
                    y: {
                      display: false,
                    },
                  },
                  elements: {
                    line: {
                      borderWidth: 2,
                      tension: 0.4,
                    },
                    point: {
                      radius: 0,
                      hitRadius: 10,
                      hoverRadius: 4,
                    },
                  },
                }}
              />
            }
          />
        </CCol>
        <CCol sm={6}>
          <CWidgetStatsA
            className="mb-4"
            color={getStyle('--cui-danger')}
            value={
              <>
                $9.000{" "}
                <span className="fs-6 fw-normal">
                  {/* (40.9% <CIcon icon={cilArrowTop} />) */}
                </span>
              </>
            }
            title="Widget title"
            action={
              <CDropdown alignment="end">
                <CDropdownToggle
                  color="transparent"
                  caret={false}
                  className="p-0"
                >
                  {/* <CIcon icon={cilOptions} className="text-white" /> */}
                </CDropdownToggle>
                <CDropdownMenu>
                  <CDropdownItem>Action</CDropdownItem>
                  <CDropdownItem>Another action</CDropdownItem>
                  <CDropdownItem>Something else here...</CDropdownItem>
                  <CDropdownItem disabled>Disabled action</CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
            }
            chart={
              <CChartBar
                className="mt-3 mx-3"
                style={{ height: "70px" }}
                data={{
                  labels: [
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "August",
                    "September",
                    "October",
                    "November",
                    "December",
                    "January",
                    "February",
                    "March",
                    "April",
                  ],
                  datasets: [
                    {
                      label: "My First dataset",
                      backgroundColor: "rgba(255,255,255,.2)",
                      borderColor: "rgba(255,255,255,.55)",
                      data: [
                        78, 81, 80, 45, 34, 12, 40, 85, 65, 23, 12, 98, 34, 84,
                        67, 82,
                      ],
                      barPercentage: 0.6,
                    },
                  ],
                }}
                options={{
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                  scales: {
                    x: {
                      grid: {
                        display: false,
                        drawTicks: false,
                      },
                      ticks: {
                        display: false,
                      },
                    },
                    y: {
                      border: {
                        display: false,
                      },
                      grid: {
                        display: false,
                        drawBorder: false,
                        drawTicks: false,
                      },
                      ticks: {
                        display: false,
                      },
                    },
                  },
                }}
              />
            }
          />
        </CCol>
      </CRow>
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                Traffic
              </h4>
              <div className="small text-body-secondary">
                January - July 2023
              </div>
            </CCol>
            <CCol sm={7} className="d-none d-md-block">
              <CButton color="primary" className="float-end">
                {/* <CIcon icon={cilCloudDownload} /> */}
              </CButton>
              <CButtonGroup className="float-end me-3">
                {["Day", "Month", "Year"].map((value) => (
                  <CButton
                    color="outline-secondary"
                    key={value}
                    className="mx-0"
                    active={value === "Month"}
                  >
                    {value}
                  </CButton>
                ))}
              </CButtonGroup>
            </CCol>
          </CRow>
          <CChartLine
            ref={chartRef}
            style={{ height: "300px", marginTop: "40px" }}
            data={{
              labels: [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
              ],
              datasets: [
                {
                  label: "My First dataset",
                  backgroundColor: "rgba(0,123,255,0.1)", // Thay đổi màu nền
                  borderColor: "#007bff", // Thay đổi màu viền
                  pointHoverBackgroundColor: "#007bff",
                  borderWidth: 2,
                  data: [
                    random(),
                    random(),
                    random(),
                    random(),
                    random(),
                    random(),
                    random(),
                    random(),
                    random(),
                    random(),
                    random(),
                    random(),
                  ],
                  //   fill: true,
                },
                {
                  label: "My Second dataset",
                  backgroundColor: "transparent",
                  borderColor: "#28a745", // Thay đổi màu viền
                  pointHoverBackgroundColor: "#28a745",
                  borderWidth: 2,
                  data: [
                    random(),
                    random(),
                    random(),
                    random(),
                    random(),
                    random(),
                    random(),
                    random(),
                    random(),
                    random(),
                    random(),
                    random(),
                  ],
                },
                {
                  label: "My Third dataset",
                  backgroundColor: "transparent",
                  borderColor: "#dc3545", // Thay đổi màu viền
                  pointHoverBackgroundColor: "#dc3545",
                  borderWidth: 1,
                  borderDash: [8, 5],
                  data: Array(12).fill(65),
                },
              ],
            }}
            options={{
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: true, // Hiển thị legend
                },
              },
              scales: {
                x: {
                  grid: {
                    color: "rgba(0,0,0,0.1)", // Đổi màu lưới trục x
                    drawOnChartArea: false,
                  },
                  ticks: {
                    color: "#000", // Đổi màu nhãn trục x
                  },
                },
                y: {
                  beginAtZero: true,
                  border: {
                    color: "rgba(0,0,0,0.1)", // Đổi màu viền trục y
                  },
                  grid: {
                    color: "rgba(0,0,0,0.1)", // Đổi màu lưới trục y
                  },
                  max: 250,
                  ticks: {
                    color: "#000", // Đổi màu nhãn trục y
                    maxTicksLimit: 5,
                    stepSize: Math.ceil(250 / 5),
                  },
                },
              },
              elements: {
                line: {
                  tension: 0.4,
                },
                point: {
                  radius: 5, // Tăng kích thước điểm
                  hitRadius: 10,
                  hoverRadius: 8, // Tăng kích thước điểm khi hover
                  hoverBorderWidth: 3,
                },
              },
            }}
          />
        </CCardBody>
      </CCard>
    </>
  );
};

export default AdminHome;
