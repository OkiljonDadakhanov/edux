param (
    [Alias("pb")]
    [Switch]$pf,
    [Switch]$ca,
    [Alias("sp")]
    [Switch]$skipPull
)

$ErrorActionPreference = "Stop"
$PSNativeCommandUseErrorActionPreference = $true
$remotePath = "/var/www/edux.center"
$buildPath = "out"
$sshOptions = "ssh -o ClearAllForwardings=yes"

Write-Host "Build path: $buildPath"
Write-Host "Remote path: $remotePath"

if (-not $skipPull)
{
    Write-Host "Pulling the latest changes"
    git pull --ff-only
}

if (-not $pf)
{
    npm run build
}

if (-not (Test-Path $buildPath))
{
    throw "Build output '$buildPath' was not found."
}

Write-Host "Publishing to $remotePath"
$confirmation = Read-Host "Are you Sure You Want To Proceed: (y/n)"
if ($confirmation -ieq "n")
{
    Write-Host "Exiting..."
    exit
}

if (-not $ca)
{
    Write-Host "Cleaning up the remote directory"
    ssh -o ClearAllForwardings=yes server "rm -rf $remotePath/*"
}

Write-Host "Uploading the files"
rsync -avz -e $sshOptions "$buildPath/" "server:$remotePath"

Write-Host "Done."
