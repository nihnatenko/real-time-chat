exports.handler = async (event) => {
    const body = JSON.parse(event.body);
    const sanitizedContent = body.content.replace(/badword/gi, '***');
    const enriched = {
        ...body,
        content: sanitizedContent,
        timestamp: new Date().toISOString(),
    };

    return {
        statusCode: 200,
        body: JSON.stringify(enriched),
    };
};
