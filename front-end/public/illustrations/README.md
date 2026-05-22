# Illustrations

This directory contains all the illustrations used across the application. 

## Structure

We organize our illustrations into specific categories to maintain a clean structure:

- `/empty`: Illustrations used for empty states (e.g., no search results, no jobs applied, empty dashboard).
- `/auth`: Illustrations used for authentication pages (login, register, forgot password).
- `/loading`: Illustrations or Lottie JSON files used during loading states.
- `/error`: Illustrations used for error pages (404, 500, failed requests).

## Approved Libraries

Please ensure all new illustrations added to this project are sourced from one of the following approved free illustration libraries. This ensures a consistent style across the SaaS/React app:

- [unDraw](https://undraw.co/)
- [Storyset](https://storyset.com/) (Currently used for our existing illustrations)
- [LottieFiles](https://lottiefiles.com/) (Best for `/loading` animations)
- [ManyPixels Gallery](https://www.manypixels.co/gallery)
- [IRA Design](https://iradesign.io/)
- [Open Doodles](https://opendoodles.com/)
- [Blush](https://blush.design/)

## Format Guidelines
- Prefer **SVG** format for static illustrations (unDraw, Storyset, etc.) for best scaling and file size.
- Use **JSON/Lottie** for complex loading animations.
- For PNGs (like our current legacy ones), ensure they are optimized before committing.
