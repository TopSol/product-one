export const marqueeReservationTemplete = (
  sendData,
  formattedDateRange,
  isReject,
  mailData,
  accept,
  booking
) => {
  const {
    phoneNumber,
    NumberOfPeople,
    address,
    eventType,
    lastName,
    firstName,
    dishes,
  } = sendData;

  return `
  ${
    isReject == "Reject"
      ? `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Document</title>
          <style>
          @media (max-width: 767px) {
            .message {
              width: 100% !important;
              margin: 0 auto;
            }
          }
          @media (min-width: 768px) {
            .message {
              width: 80% !important;
              margin: 0 auto;
            }
          }
        </style>
        </head>
        <body>
          <h1 style="text-align: center; color: #f59832">Marquee Reservation</h1>
          <h2 style="text-align: center">Thanks For Your Order</h2>
          <div
            style="
              width: 100%;
              margin: 0 auto;
              display: flex;
              justify-content: center;
            "
          >
            <p class="message" style="width: 65%; text-align: center">
              Dear ${firstName}${lastName},<br/>
              We regret to inform you that your request for a Marquee reservation on ${formattedDateRange} has been carefully reviewed and, unfortunately, we are unable to approve it at this time. We understand the importance of your event and appreciate your interest in utilizing our Marquee space. The decision to reject the reservation request is based on ${mailData?.reason}. We assure you that we have considered all factors to ensure a fair and efficient allocation of our Marquee facilities. We sincerely apologize for any inconvenience this may have caused and encourage you to reach out for any further inquiries or to explore alternative options for your event. Thank you for considering our venue for your event, and we wish you the best in finding a suitable location for your requirements.
            </p>
          </div>
        </body>
      </html>`
      : ` `
  }
  ${
    accept == "accept"
      ? `
      <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
        <style>
          @media (max-width: 767px) {
            .responsive-div {
              width: 100% !important;
              margin: 0 auto;
            }
          }
          @media (min-width: 768px) {
            .responsive-div {
              width: 80% !important;
              margin: 0 auto;
            }
          }
          @media (max-width: 767px) {
            .message {
              width: 100% !important;
              margin: 0 auto;
            }
          }
          @media (min-width: 768px) {
            .message {
              width: 80% !important;
              margin: 0 auto;
            }
          }
    
          table {
            font-family: arial, sans-serif;
            border-collapse: collapse;
            width: 100%;
            margin: 0 auto;
          }
    
          td,
          th {
            border: 1px solid #f59832;
            text-align: left;
            padding: 8px;
          }
          tr:nth-child(even) {
            background-color: #f59832;
            color: white;
          }
        </style>
      </head>
      <body>
        <h1 style="text-align: center; color: #f59832">Marquee Reservation</h1>
        <h2 style="text-align: center">Thanks For Your Order</h2>
        <div
          style="
            width: 100%;
            margin: 0 auto;
            display: flex;
            justify-content: center;
          "
        >
          <p class="message" style="width: 65%; text-align: center">
            Dear ${firstName}${lastName},
            We are delighted to inform you that your request for a
            marquee reservation has been successfully approved. These following
            tables shows the detiled summary of the Marquee and menu that you have
            selected for your event.
          </p>
        </div>
        <div class="responsive-div">
          <h3 style="color: #f59832">Marquee Details</h3>
          <table>
            <tr>
              <td>Summary</td>
              <td>Details</td>
            </tr>
            <tr>
              <td>Name</td>
              <td>${firstName}${lastName}</td>
            </tr>
            <tr>
              <td>Event Type</td>
              <td>${eventType}</td>
            </tr>
            <tr>
            <td>Number Of Peoples</td>
            <td>${NumberOfPeople}</td>
          </tr>
          <tr>
          <td>Date</td>
          <td>${formattedDateRange}</td>
        </tr>
          <tr>
          <td>Address</td>
          <td>${address}</td>
        </tr>
        <tr>
        <td>Phone Number</td>
        <td>${phoneNumber}</td>
      </tr>
          </table>
          <h3 style="color: #f59832">Menu Details</h3>
          <table>
          <tr>
            <th>Dishes</th>
            <th>Price</th>
          </tr>
          ${dishes?.nameAndPriceArrays
            ?.map(
              (item) => `
                <tr>
                <td>${item?.name}</td>
                <td>${item?.price}</td>
                </tr>`
            )
            .join("")}
        </table>
              ${
                dishes?.totalDiscount == undefined
                  ? `<p style="color: #f59832; font-weight: bold; display: flex; justify-content: end;"> Per/Head = ${dishes?.perHead} </p>`
                  : ` <h3 style="color: #f59832">Add On Details</h3>
                  <table>
                  <tr>
                    <th>Dishes</th>
                    <th>Price</th>
                  </tr>
                  ${dishes?.nameAndPriceArray
                    ?.map(
                      (item) => `
                        <tr>
                        <td>${item?.name}</td>
                        <td>${item?.price}</td>
                        </tr>`
                    )
                    .join("")}
                </table>
                <p style="color: #f59832; font-weight: bold;">Per/Head = ${
                  dishes?.totalDiscount
                }</p>
                `
              }
        </div>
      </body>
    </html>`
      : ` `
  }
  ${
    booking == "booking"
      ? `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Document</title>
          <style>
          @media (max-width: 767px) {
            .message {
              width: 100% !important;
              margin: 0 auto;
            }
          }
          @media (min-width: 768px) {
            .message {
              width: 80% !important;
              margin: 0 auto;
            }
          }
        </style>
        </head>
        <body>
          <h2 style="text-align: center; color: #f59832">Marquee Reservation</h2>
          <h2 style="text-align: center">Thanks For Your Order</h2>
          <div
            style="
              width: 100%;
              margin: 0 auto;
              display: flex;
              justify-content: center;
            "
          >
            <p class="message" style="width: 65%; text-align: center">
              Dear Customer,
              Thank you for your request. We have forwarded it to the owner of the marquee. They will review your request and confirm it as soon as possible. We appreciate your patience, and if you have any further questions or concerns, please don't hesitate to reach out to us.
              </p>
          </div>
        </body>
      </html>
      `
      : ` `
  }
`;
};
