# Stage1: UI Build
FROM node:14-slim AS frontend-build
WORKDIR /usr/src
COPY frontend/ ./frontend/
RUN cd frontend && npm install && npm run build

# Stage2: API Build
FROM node:14-slim AS backend-build
WORKDIR /usr/src
COPY backend/ ./backend/
RUN cd backend && npm install && ENVIRONMENT=production npm run build

# Stage3: Packagign the app
FROM node:14-slim
WORKDIR /root/
COPY --from=frontend-build /usr/src/frontend/build ./frontend/build
COPY --from=backend-build /usr/src/backend/dist .
RUN mkdir uploads

EXPOSE 5000

CMD ["node", "api.bundle.cjs"]