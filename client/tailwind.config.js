module.exports = {
    purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    darkMode: "class", // or 'media' or 'class'
    theme: {
        extend: {},
        screens: {
            sm: "480px",
            md: "768px",
            lg: "976px",
            xl: "1800px",
        },
        maxWidth: {
            "600": "600px",
            "500": "500px",
            "400": "400px",
            "1075": "1075px",
        },
        width: {
            "45%": "45%",
            "100%": "100%",
            "40": "40px",
            "60": "60px",
            "75": "75px",
            "100": "100px",
            "150": "150px",
            "200": "200px",
            "250": "250px",
            "300": "300px",
            "400": "400px"
        },
        colors: {
            grayL: "#FAF9F9",
            gray: "#444",
            border: "#707070",
            white: "#fff",
            black: "#000",
            green: "#22D671",
            blue: "#4AA4E1",
            blueDark: "#17165C",
            bgBtnGray: "#efefef",
            red: "#FF0000",
            text: "#7B7B7B",
        },
        boxShadow: {
            shadow: "5px 5px 10px rgba(0, 0, 0, 0.161)"
        }
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
