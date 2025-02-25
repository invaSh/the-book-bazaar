FROM mcr.microsoft.com/dotnet/sdk:8.0 as build
WORKDIR /app
EXPOSE 80

COPY TheBookBazaar.sln TheBookBazaar.sln
COPY src/BookService/BookService.csproj src/BookService/BookService.csproj
COPY src/InventoryService/InventoryService.csproj src/InventoryService/InventoryService.csproj
COPY src/OrderService/OrderService.csproj src/OrderService/OrderService.csproj
COPY src/IdentityService/IdentityService.csproj src/IdentityService/IdentityService.csproj
COPY src/Contracts/Contracts.csproj src/Contracts/Contracts.csproj

RUN dotnet restore TheBookBazaar.sln
COPY  src/InventoryService src/InventoryService
COPY  src/Contracts src/Contracts
WORKDIR /app/src/InventoryService
RUN dotnet publish -c Release -o /app/src/out

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/src/out .
ENTRYPOINT ["dotnet", "InventoryService.dll"]
