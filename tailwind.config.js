/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        vollkorn: ["Vollkorn", "serif"],
        poppins: ["Poppins", "sans-serif"],
        sc:"'Source Code Pro',monospace",
        Manrope : "'Manrope', sans-serif",
      },
      colors: {
        primaryColor: "#DDB667",
        matteBlack : "#545454",
        primary:"#F59832",
        lightPrimary: "#F5BE4F",
        sidebarColor: "#545454",
        hoverPrimary: "#FFC587",
        secondaryColor: "#32353C",
        bgColor: "#f5f5f5",
        hoverBgColor:"#E5E7EB",
        textColor: "#878D8D",
        textColor2: "##FDFDFD",
        headingColor: "#474747",
        blackColor: "#000",
        WhiteColor: "#ffff",
        thirdColor: "fcb900",
        sidebarColor: "#EFEFEF",
        sidebarItemColor: "#F9AA51",
        sidebarColorText: "#818181",
      },
    },
  },
};
