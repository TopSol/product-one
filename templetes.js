export const marqueeReservationTemplete = (sendData, formattedDateRange) => {
  const {
    phoneNumber,
    NumberOfPeople,
    address,
    eventType,
    lastName,
    firstName,
    dishes,
  } = sendData;
  console.log(formattedDateRange);
  return `<!DOCTYPE html>
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
          <h1 style="text-align: center">Thanks For Your Order</h1>
          <div
            style="
              width: 100%;
              margin: 0 auto;
              display: flex;
              justify-content: center;
            "
          >
            <p class="message" style="width: 65%; text-align: center">
              Dear Customer, We are delighted to inform you that your request for a
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
                </tr>
        `
              )
              .join("")}
          
  
            
  
          </table>
          
            <p style="color: #f59832; font-weight: bold; display: flex; justify-content: end;">
                Per/Head = "perHead"
            </p>
          </div>
        </body>
      </html>`;
};
