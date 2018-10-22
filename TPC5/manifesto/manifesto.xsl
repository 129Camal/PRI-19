<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="2.0">
    
    <xsl:template match="/">
        <html>
            <head>
                <title>TPC5</title>
                <meta charset="UTF-8"/>
            </head>
            <body>  
                <xsl:apply-templates/>  
            </body>
        </html>
    </xsl:template>
    
    <xsl:template match="meta">
        <h1 style="text-align:center;" > <xsl:value-of select="./@nome"/> </h1>
        <hr/>
        <hr/>
            <table width="100%" style="text-align:center;">
                  <tr>
                      <td><b>Key Name: </b> <xsl:value-of select="./id"/></td>
                      <td><b>Title: </b> <xsl:value-of select="./título"/></td>
                  </tr>
                  <tr>
                      <td><b>Date: </b> <xsl:value-of select="./dfim"/></td>
                      <td><b>Supervisor: </b> <a href="{supervisor/website}"><xsl:value-of select="supervisor/nome"/></a></td>
                  </tr>
              </table>
        <hr/>
        <hr/>
         
    </xsl:template>
    
    <xsl:template match="equipe">
        <h2>WorkTeam:</h2>
        <table width="100%">
           <xsl:apply-templates/> 
        </table>
        <hr/>
        <hr/>
    </xsl:template>
    
    <xsl:template match="elemento">
        <tr>
            <td>
                <ul>
                    <li><xsl:value-of select="./idelemento"/> - <b><xsl:value-of select="./nome"/></b> <p>Email: <a href="mailto:{./email}"><xsl:value-of select="./email"/></a></p> <p>Link GitHub: <a href="https://github.com/129Camal/PRI-19/tree/master/TPC5">GitHub</a></p></li>
                </ul>
            </td>
            <td>
                <img src="{./foto/@path}" width="120" height="120"/>
            </td>
        </tr>
    </xsl:template>
    
    <xsl:template match="resumo">
        <h2>Abstract:</h2>
        <xsl:apply-templates/>
        <hr/>
        <hr/>
    </xsl:template>
    
    <xsl:template match="para">
        <p><xsl:apply-templates/></p>
    </xsl:template>
    
    <xsl:template match="b">
        <b><xsl:value-of select="."/></b>
    </xsl:template>
    
    <xsl:template match="i">
        <i><xsl:value-of select="."/></i>
    </xsl:template>
    
    <xsl:template match="resultados">
        <h2>Deliverables:</h2>
        <ul>
            <xsl:apply-templates/> 
        </ul>
        <hr/>
        <hr/>
    </xsl:template>
    
    <xsl:template match="resultado">
        <li><a href="{@path}"><xsl:value-of select="."/></a></li>
    </xsl:template>
    
</xsl:stylesheet>