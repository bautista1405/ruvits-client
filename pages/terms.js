import { signIn, signOut, useSession, getSession } from "next-auth/client";

import {
    Box,
    Flex,
    Text,
    chakra,
    Link
} from '@chakra-ui/react'

const TermsAndConditions = () => {
  return (
    <>
        <Flex justifyContent="center" flexDir="column" margin="100px"> 

          <Flex justifyContent="center">
            <Text fontSize={32} color="gray.600" fontWeight="bold">Términos y condiciones </Text>
          </Flex>
          
          <Flex mt={20} flexDir="column">
           <Text fontSize={20} color="gray.600" fontWeight="bold" mb={5}>Resumen</Text> 
              <chakra.ul ml={10}>
                <chakra.li>Ruvits es un marketplace que ofrece servicios vinculados principalmente al comercio electrónico de productos digitales
                y a los pagos digitales, utilizando Mercado Pago como pasarela de pagos.</chakra.li>
                
                <chakra.li>El marketplace es una plataforma de comercio electrónico donde los usuarios pueden vender y comprar productos usando diferentes medios de pago, 
                  siempre dentro de Mercado Pago.</chakra.li>
                
                <chakra.li>Mercado Pago es una plataforma de pagos y cobros que puede ser usada tanto para operaciones realizadas dentro del Marketplace como fuera de él.</chakra.li>
                
                <chakra.li>Para poder operar en la plataforma todas los usuarios deberán aceptar los Términos y Condiciones y la Política de Privacidad.</chakra.li>

                <chakra.li>Cada usuario es responsable de los datos personales que brinda al momento de registrarse y se obliga a mantenerlos actualizados. </chakra.li>

                <chakra.li>En algunos casos, podremos cobrar una tarifa por el uso de los servicios de la plataforma, que el usuario se compromete a pagar.</chakra.li>
              </chakra.ul>
            <Text>
              <br />
              <br />
              <b> 1- Ruvits</b>
               <br />
Ruvits (de ahora en más "Sitio") es una página web que ofrece servicios vinculados principalmente al comercio electrónico y a los pagos digitales. 

Los servicios que ofrece el Sitio están pensados y diseñados para fomentar un entorno que permita a las personas vender y comprar productos.
<br />
<br />
<b> 2- Términos y Condiciones </b>
<br />
Estos términos y condiciones que explican los servicios del Sitio regulan la relación el mismo y las  personas que usan sus servicios 
(usuarios). 

Los usuarios aceptan estos Términos y Condiciones desde el momento en que se registran en el Sitio y utilizan la plataforma.

Cuando debamos hacer cambios importantes en nuestros servicios, publicaremos las modificaciones para que los usuarios puedan revisarlas.

Los usuarios que no tengan obligaciones pendientes con el Sitio o con otros usuarios, podrán finalizar la relación con el Sitio eliminando 
su cuenta.
<br />
              <br />
<b>3- Capacidad</b>
<br />
Podrán usar nuestros servicios las personas mayores de edad que tengan capacidad legal para contratar. Los menores de edad, a partir de los 13 años, sólo podrán 
utilizar su cuenta con autorización del representante legal, quien responderá por todas las acciones y obligaciones que se deriven de la utilización de esa cuenta y 
quien deberá velar por el uso responsable y adecuado de ella en atención a la madurez del menor de edad que autorice.


<br />
              <br />
<b>4- Registro y Cuenta</b>
<br />
Quien quiera usar nuestros servicios, deberá registrarse en la plataforma. Al hacerlo, se compromete a hacerlo de manera exacta, precisa y verdadera y a mantener sus 
datos siempre actualizados. La persona será la única responsable de la certeza de sus datos de registro. Sin perjuicio de la información brindada en el formulario, podremos solicitar y/o consultar información adicional para corroborar la identidad del usuario. 

La cuenta es personal, única e intransferible, es decir que bajo ningún concepto se podrá vender o ceder a otra persona. 
En cualquier caso, el usuario será el único responsable por las operaciones que se realicen en su cuenta. En caso de detectar un uso no autorizado de su cuenta, 
deberá notificar de forma inmediata al Sitio. 

Podremos rechazar una solicitud de registro o bien cancelar un registro ya aceptado, sin que esto genere derecho a un resarcimiento. No podrán registrarse nuevamente 
en el Sitio los usuarios que hayan sido inhabilitados previamente. Tampoco podrán registrarse quienes estén incluidos o relacionados a personas incluidas en listas 
nacionales o internacionales de sanciones.

Además, en caso de detectar el uso de más de una cuenta, podremos aplicar retenciones, débitos y/o cualquier otra medida si consideramos que ese accionar puede 
perjudicar al resto de las personas que usan el Sitio o a Ruvits mismo, más allá de las sanciones que pudieran corresponder. 
<br />
              <br />
<b>5- Privacidad de datos</b>
<br />
En el Sitio hacemos un uso responsable de la información personal, protegiendo la privacidad de los usuarios que nos confiaron sus datos y tomando las medidas 
necesarias para garantizar la seguridad en la plataforma. <Link href="/privacy_policies">Conocé más sobre nuestra Política de Privacidad.</Link>
<br />
              <br />
<b>6- Sanciones</b>
<br />
En caso que el Usuario incumpliera una ley o los Términos y Condiciones, podremos advertir, suspender, restringir o inhabilitar temporal o definitivamente su 
cuenta, sin perjuicio de otras sanciones que se establezcan en las reglas de uso particulares de los servicios del Sitio. 
<br />
              <br />
<b>7- Responsabilidad</b>
<br />
El Sitio será responsable por cualquier defecto en la prestación de su servicio, en la medida en que le sea imputable y con el alcance previsto en las leyes 
vigentes. 
<br />
              <br />
<b>8- Tarifas</b>
<br />
El Sitio podrá cobrar por sus servicios y el Usuario se compromete a pagarlos a tiempo. 

Podremos modificar o eliminar las tarifas en cualquier momento con el debido preaviso establecido en la cláusula 2 de estos Términos y Condiciones. De la misma manera, 
podremos modificar las tarifas temporalmente por promociones en favor de las usuarios. 

El Usuario autoriza a el Sitio a retener y/o debitar los fondos existentes y/o futuros de su cuenta de Mercado Pago y/o de las cuentas bancarias que haya 
registrado en ella, para saldar las tarifas impagas o cualquier otra deuda que pudiera tener. 

<br />
              <br />
<b>9- Propiedad Intelectual</b>
<br />
El Sitio y/o sus sociedades relacionadas son propietarias de todos los derechos de propiedad intelectual sobre sus sitios, todo su contenido, servicios, productos, 
marcas, nombres comerciales, logos, diseños, imágenes, frases publicitarias, derechos de autor, dominios, programas de computación, códigos, desarrollos, software, 
bases de datos, información, tecnología, patentes y modelos de utilidad, diseños y modelos industriales, secretos comerciales, entre otros (“Propiedad Intelectual”) y 
se encuentran protegidos por leyes nacionales e internacionales.

Aunque el Sitio otorga permiso para usar sus productos y servicios conforme a lo previsto en los Términos y Condiciones, esto no implica una autorización para usar 
su  Propiedad Intelectual, excepto consentimiento previo y expreso del Sitio y/o sus sociedades vinculadas. En cualquier caso, los usuarios vendedores que usen 
dichos productos y servicios no podrán utilizar la Propiedad Intelectual del Sitio de una manera que cause confusión en el público y deberán llevar a cabo su 
actividad comercial bajo una marca o nombre comercial propio y distintivo, que no resulte confundible con la marca del Sitio.

Está prohibido usar nuestros productos o servicios para fines ilegales, realizar cualquier tipo de ingeniería inversa u obras derivadas, utilizar herramientas de 
búsqueda o de extracción de datos y contenidos de nuestra plataforma para su reutilización y/o crear bases de datos propias que incluyan en todo o en parte nuestro 
contenido sin nuestra expresa autorización. Está también prohibido el uso indebido, sin autorización y/o contrario a la normativa vigente y/o que genere confusión o 
implique uso denigratorio y/o que le cause perjuicio, daños o pérdidas al Sitio y/o a sus sociedades relacionadas. La utilización de los productos y servicios 
del Sitio tampoco implica la autorización para usar propiedad intelectual de terceros que pueda estar involucrada, cuyo uso quedará bajo exclusiva 
responsabilidad del Usuario. 
En caso que un Usuario o cualquier publicación infrinja la Propiedad Intelectual del Sitio o de terceros, el Sitio podrá remover dicha publicación 
(total o parcialmente), sancionar al Usuario conforme a lo previsto en estos Términos y Condiciones y ejercer las acciones extrajudiciales y/o judiciales correspondientes.
<br />
              <br />
 <b>10- Indemnidad</b>
 <br />
El Usuario mantendrá indemne al Sitio y sus sociedades relacionadas, así como a quienes la dirigen, suceden, administran, representan y/o trabajan en 
ellas, por cualquier reclamo administrativo o judicial iniciado por otras usuarios, terceros o por cualquier Organismo, relacionado con sus actividades en la plataforma.
En virtud de esa responsabilidad, podrán realizar compensaciones, retenciones u otras medidas necesarias para la reparación de pérdidas, daños y perjuicios, 
cualquiera sea su naturaleza.
<br />
              <br />

<b>11- Jurisdicción y Ley Aplicable</b>
<br />
Estos Términos y Condiciones se rigen por la ley argentina. Toda controversia derivada de su aplicación, interpretación, ejecución o validez será resuelta por los 
tribunales nacionales ordinarios competentes, con asiento en la Ciudad de Buenos Aires, salvo disposición específica de normas de orden público, como por ejemplo, 
legislación relativa al Consumidor.
            </Text>
            <Text mt={10}> ©️ 2022 Ruvits </Text>
          </Flex>
        
        </Flex>
    </>
  )
}

export async function getServerSideProps(ctx) {
  return {
    props: {
      session: await getSession(ctx)
    }
  }
}

export default TermsAndConditions