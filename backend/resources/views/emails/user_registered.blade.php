<!DOCTYPE html>
<html>
<body>
    <h1>¡Hola, {{ $user->name }}!</h1>
    <p>Tu cuenta en <strong>Red Vital</strong> ha sido creada exitosamente.</p>
    <p>Ya puedes acceder al sistema con tu correo: <b>{{ $user->email }}</b></p>
    <br>
    <p>Saludos,<br>Equipo de Coordinación Hemática</p>
</body>
</html>