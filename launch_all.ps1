# Sales Savvy Full-Stack Launch Script (PowerShell)

Write-Host "--- Initializing Sales Savvy Ecosystem ---" -ForegroundColor Cyan

# 1. Start MySQL (Assumes standard installation)
# If MySQL is already running as a service, skip this.

# 2. Launch Backend Microservices
$services = @(
    @{ name = "User Management (Auth)"; path = "UserManagementService"; port = 8081 },
    @{ name = "Product Service"; path = "ProductService"; port = 8082 },
    @{ name = "Order Management"; path = "OrderManagementService"; port = 8083 },
    @{ name = "Payment Service"; path = "PaymentService"; port = 8084 },
    @{ name = "Admin Service"; path = "AdminService"; port = 8085 }
)

foreach ($service in $services) {
    Write-Host "Starting $($service.name) on port $($service.port)..." -ForegroundColor Yellow
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd $($service.path); mvn spring-boot:run" -WindowStyle Normal
}

# 3. Launch Frontend
Write-Host "Starting Sales Savvy Frontend..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd sales-savvy-frontend; npm run dev" -WindowStyle Normal

Write-Host "--- All systems operational ---" -ForegroundColor Cyan
Write-Host "Frontend: http://localhost:5173"
Write-Host "Backend API Ports: 8081 - 8085"
